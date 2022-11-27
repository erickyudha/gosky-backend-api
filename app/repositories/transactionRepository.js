const {Transaction} = require('../models');

module.exports = {
  findAll() {
    return Transaction.findAll();
  },

  find(id) {
    return Transaction.findByPk(id);
  },

  create(args) {
    return Transaction.create(args);
  },
};
