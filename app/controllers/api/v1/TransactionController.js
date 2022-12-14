const {
  GeneralError,
  UnauthorizedError,
  IdNotFoundError,
  MissingFieldError,
} = require('../../../errors');
class TransactionController {
  constructor(
      transactionService,
      userService,
      ticketService,
      notificationService,
      emailService,
  ) {
    this.transactionService = transactionService;
    this.userService = userService;
    this.ticketService = ticketService;
    this.notificationService = notificationService;
    this.emailService = emailService;
  }

  handleGetList = async (req, res) => {
    // USER is only authorized to access transactions made by themself.
    // On other hands ADMIN can access all transactions in database.
    try {
      const user = req.user;
      const listAdmin = await this.transactionService.list();
      const listUser = await this.transactionService.listByUser(user.id);
      let transaction;
      if (user.role === 'ADMIN') {
        transaction = listAdmin;
      } else {
        transaction = listUser;
      }
      res.status(200).json({
        status: 'success',
        message: 'get transaction list data success',
        data: transaction,
        meta: {count: transaction.length},
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
      let transaction;
      const user = req.user;
      const transactionId = req.params.id;
      if (user.role === 'ADMIN') {
        const listAdmin = await this.transactionService.list();
        transaction = listAdmin;
      } else {
        const getUser = await this.transactionService.get(transactionId);
        if (!getUser) {
          const error = new IdNotFoundError();
          res.status(404).json(error.json());
          return;
        }

        if (user.id != getUser.userId) {
          const error = new UnauthorizedError();
          res.status(401).json(error.json());
          return;
        }
        transaction = getUser;
      }
      res.status(200).json({
        status: 'success',
        message: 'get transaction list data success',
        data: transaction,
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
      const ticketId = await this.ticketService.get(req.body.ticketId);
      if (!ticketId) {
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
          user.id, `Transaction ticket ${ticketId.id} is success`,
      );
      await this.emailService.sendTransactionEmail(user.email, transaction,
          (err, info) => {
            if (err) {
              throw err;
            } else {
              res.status(200).json({
                status: 'success',
                message: 'add transaction success',
                data: transaction,
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
