const {
  GeneralError,
  IdNotFoundError,
} = require('../../../errors');
class WishlistController {
  constructor(wishlistService, ticketService) {
    this.wishlistService = wishlistService;
    this.ticketService = ticketService;
  };

  handleGetList = async (req, res) => {
    try {
      const user = req.user;
      const listTicket = [];
      const listWishlist = await this.wishlistService.listByUser(user.id);
      for (let i = 0; i < listWishlist.length; i++) {
        const wishlist = listWishlist[i];
        const ticket = await this.ticketService.get(wishlist.ticketId);
        listTicket.push(ticket);
      }
      res.status(200).json({
        status: 'success',
        message: 'wishlist ticket success',
        data: listTicket,
        meta: {count: listTicket.length},
      });
    } catch (err) {
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
    }
  };

  handleCreate = async (req, res) => {
    // Add to user wishlist
    try {
      const user = req.user;
      const ticket = await this.ticketService.get(req.params.id);
      if (!ticket) {
        const err = new IdNotFoundError();
        res.status(404).json(err.json());
        return;
      }
      const check = await this.wishlistService.getByData(user.id, ticket.id);
      if (check) {
        res.status(409).json({
          status: 'failed',
          message: 'ticket already wishlisted',
        });
        return;
      }
      this.wishlistService.add(user.id, ticket.id);
      res.status(200).json({
        status: 'success',
        message: 'wishlist ticket success',
      });
    } catch (err) {
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
    }
  };

  handleDelete = async (req, res) => {
    // Remove from user wishlist
    try {
      const user = req.user;
      const ticketId = req.params.id;
      const ticket = await this.ticketService.get(ticketId);
      if (!ticket) {
        const err = new IdNotFoundError();
        res.status(404).json(err.json());
        return;
      }
      this.wishlistService.delete(user.id, ticketId);
      res.status(200).json({
        status: 'success',
        message: 'unwish ticket success',
      });
    } catch (err) {
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
    }
  };
};

module.exports = WishlistController;
