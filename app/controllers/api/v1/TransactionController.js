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

  handleGetList(req, res) {
    // TODO:
    // USER is only authorized to access transactions made by themself.
    // On other hands ADMIN can access all transactions in database.
  };

  handleGet(req, res) {
    // TODO:
    // USER is only authorized to access transactions made by themself.
    // On other hands ADMIN can access all transactions in database.
    // UnauthorizedError if USER try to access transaction not made by them
  };

  handleCreate(req, res) {
    // TODO:
    // bookingCode random 10 character of number and letter (all cap)
    // example WAKDU318ND

    // FUNCTION FLOW:
    // 1. Create and add transaction to db
    // 2. Push new notification, message example
    //    "Transaction ticket {ticket Id} is success" (bebas)
    // 3. Send transaction to user email
  }
}

module.exports = TransactionController;
