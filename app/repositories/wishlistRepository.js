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

  delete(id) {
    return Wishlist.destroy({where: {id}});
  },
};
