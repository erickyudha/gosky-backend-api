const {transactionRepository} = require('../repositories');

module.exports = {
  find(id) {
    return transactionRepository.find(id);
  },

  findAll() {
    return transactionRepository.findAll();
  },

  create(args) {
    return transactionRepository.create();
  },
};
