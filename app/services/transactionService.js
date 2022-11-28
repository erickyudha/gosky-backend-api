const {transactionRepository} = require('../repositories');

module.exports = {
  get(id) {
    return transactionRepository.find(id);
  },

  list() {
    return transactionRepository.findAll();
  },

  create(args) {
    return transactionRepository.create();
  },
};
