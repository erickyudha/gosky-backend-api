class WishlistController {
  constructor(wishlistService) {
    this.wishlistService = wishlistService;
  };

  handleGetList(req, res) {
    // TODO:
    // Get logged in user ticket wishlist
    res.status(200).end();
  };

  handleCreate(req, res) {
    // TODO:
    // Add to user wishlist
  };

  handleDelete(req, res) {
    // TODO:
    // Remove from user wishlist
  };
};

module.exports = WishlistController;
