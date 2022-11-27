const {wishlistRepository} = require('../repositories');

module.exports = {
  list() {
    return wishlistRepository.findAll();
  },

  get(id) {
    return wishlistRepository.find(id);
  },

  create(args) {
    return wishlistRepository.create(args);
  },

  delete(id) {
    return wishlistRepository.delete(id);
  },
};
