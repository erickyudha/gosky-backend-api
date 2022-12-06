class TransactionController {
  constructor(transactionService, userService, ticketService) {
    this.transactionService = transactionService;
    this.userService = userService;
    this.ticketService = ticketService;
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
  }
}

module.exports = TransactionController;
