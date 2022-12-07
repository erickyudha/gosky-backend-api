const {Transaction} = require('../models');

module.exports = {
  findAll(args) {
    return Transaction.findAll(args);
  },

  find(id) {
    return Transaction.findByPk(id);
  },

  create(args) {
    return Transaction.create(args);
  },
};
