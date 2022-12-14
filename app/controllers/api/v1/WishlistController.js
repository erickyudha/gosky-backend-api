const {
  GeneralError,
  IdNotFoundError,
} = require('../../../errors');
class WishlistController {
  constructor(wishlistService, ticketService, userService) {
    this.wishlistService = wishlistService;
    this.ticketService = ticketService;
    this.userService = userService;
  };

  handleGetList = async (req, res) => {
    // FIX:
    // Return TICKET object list, not wishlist list itself
    try {
      const userId = req.user;
      const listTicket = [];
      const list = await this.wishlistService.listByUser(userId.id);
      for (let index = 0; index < list.length; index++) {
        const element = list[index].userId;
        if (userId.id === element) {
          const b = await this.ticketService.get(list[index].ticketId);
          listTicket.push(b);
        }
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
    // TODO:
    // Add to user wishlist
    try {
      const userId = req.user;
      const ticketId = await this.ticketService.get(req.params.id);
      if (!ticketId) {
        const err = new IdNotFoundError();
        res.status(404).json(err.json());
        return;
      }
      const chck = await this.wishlistService.getByData(userId.id, ticketId.id);
      if (chck) {
        res.status(409).json({
          status: 'failed',
          message: 'ticket already wishlisted',
        });
        return;
      }
      this.wishlistService.add(userId.id, ticketId.id);
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
    // TODO:
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
