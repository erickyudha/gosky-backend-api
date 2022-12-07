const {wishlistRepository} = require('../repositories');

module.exports = {
  listByUser(userId) {
    return wishlistRepository.findAll({where: {userId}});
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
