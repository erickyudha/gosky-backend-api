const {Wishlist} = require('../models');

module.exports = {
  findAll(args) {
    return Wishlist.findAll(args);
  },

  create(args) {
    return Wishlist.create(args);
  },

  delete(args) {
    return Wishlist.destroy({where: args});
  },
};
