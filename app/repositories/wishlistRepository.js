const {Wishlist} = require('../models');

module.exports = {
  findAll() {
    return Wishlist.findAll();
  },

  find(id) {
    return Wishlist.findByPk(id);
  },

  create(args) {
    return Wishlist.create(args);
  },

  delete(args) {
    return Wishlist.destroy({where: args});
  },
};
