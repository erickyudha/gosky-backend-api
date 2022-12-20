const {
  GeneralError,
  UnauthorizedError,
  IdNotFoundError,
  MissingFieldError,
} = require('../../../errors');
class TransactionController {
  constructor(
      transactionService,
      ticketService,
      notificationService,
      emailService,
  ) {
    this.transactionService = transactionService;
    this.ticketService = ticketService;
    this.notificationService = notificationService;
    this.emailService = emailService;
  }

  handleGetList = async (req, res) => {
    // USER is only authorized to access transactions made by themself.
    // On other hands ADMIN can access all transactions in database.
    try {
      const user = req.user;
      let transactions;
      if (user.role === 'ADMIN') {
        transactions = await this.transactionService.list();
      } else {
        transactions = await this.transactionService.listByUser(user.id);
      }
      const result = [];
      for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        const ticket = await this.ticketService.get(transaction.ticketId);
        const append = {
          ...transaction.dataValues,
          ticket,
        };
        result.push(append);
      }
      res.status(200).json({
        status: 'success',
        message: 'get transaction list data success',
        data: result,
        meta: {count: result.length},
      });
    } catch (err) {
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
    }
  };

  handleGet = async (req, res) => {
    // USER is only authorized to access transactions made by themself.
    // On other hands ADMIN can access all transactions in database.
    // UnauthorizedError if USER try to access transaction not made by them
    try {
      const user = req.user;
      const transactionId = req.params.id;
      const transaction = await this.transactionService.get(transactionId);
      if (!transaction) {
        const error = new IdNotFoundError();
        res.status(404).json(error.json());
        return;
      }
      if (user.role === 'USER' && user.id != transaction.userId) {
        const error = new UnauthorizedError();
        res.status(401).json(error.json());
        return;
      }
      const ticket = await this.ticketService.get(transaction.ticketId);
      res.status(200).json({
        status: 'success',
        message: 'get transaction data success',
        data: {
          ...transaction.dataValues,
          ticket,
        },
      });
    } catch (err) {
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
    }
  };

  handleCreate = async (req, res) => {
    // bookingCode random 10 character of number and letter (all cap)
    // example WAKDU318ND

    // FUNCTION FLOW:
    // 1. Create and add transaction to db
    // 2. Push new notification, message example
    //    "Transaction ticket {ticket Id} is success" (bebas)
    // 3. Send transaction to user email
    try {
      let bookingCode = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
      for (let i = 0; i < 9; i++) {
        bookingCode += characters.charAt(Math.floor(Math.random() *
          characters.length));
      }
      const user = req.user;
      if (
        !req.body.ticketId ||
        !req.body.amount
      ) {
        const error = new MissingFieldError();
        res.status(400).json(error.json());
        return;
      }
      const ticket = await this.ticketService.get(req.body.ticketId);
      if (!ticket) {
        const err = new IdNotFoundError();
        res.status(404).json(err.json());
        return;
      }
      const transaction = await this.transactionService.create({
        userId: user.id,
        ticketId: req.body.ticketId,
        amount: req.body.amount,
        bookingCode: bookingCode,
      });
      await this.notificationService.create(
          user.id,
          `Transaction of ${req.body.amount} ${ticket.category} ` +
          `[${ticket.from} - ${ticket.to}] ticket(s) is success`,
      );
      await this.emailService.sendTransactionEmail(
          user.email, transaction, ticket, user,
          (err, info) => {
            if (err) {
              throw err;
            } else {
              res.status(201).json({
                status: 'success',
                message: 'add transaction success',
                data: {
                  ...transaction.dataValues,
                  ticket,
                },
              });
            }
          },
      );
    } catch (err) {
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
    }
  };
}

module.exports = TransactionController;
