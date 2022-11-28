const {wishlistRepository} = require('../repositories');

module.exports = {
  list() {
    return wishlistRepository.findAll();
  },

  get(id) {
    return wishlistRepository.find(id);
  },

  add(userId, ticketId) {
    return wishlistRepository.create({
      userId, ticketId,
    });
  },

  delete(userId, ticketId) {
    return wishlistRepository.delete({
      userId, ticketId,
    });
  },
};
