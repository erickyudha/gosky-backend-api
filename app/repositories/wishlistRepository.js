const {Wishlist} = require('../models');

module.exports = {
  findAll(args) {
    return Wishlist.findAll(args);
  },

  get(id) {
    return Wishlist.findByPk(id);
  },

  create(args) {
    return Wishlist.create(args);
  },

  delete(args) {
    return Wishlist.destroy({where: args});
  },
};
