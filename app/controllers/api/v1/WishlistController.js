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
      const list = await this.wishlistService.listByUser(userId.id);
      res.status(200).json({
        status: 'success',
        message: 'wishlist ticket success',
        data: list,
        meta: list.length,
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
      const ticket = await this.wishlistService.get(ticketId);
      if (!ticket) {
        const err = new IdNotFoundError();
        res.status(404).json(err.json());
        return;
      }
      this.wishlistService.delete(user.id, ticket.ticketId);
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
