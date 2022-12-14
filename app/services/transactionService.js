const {transactionRepository} = require('../repositories');

module.exports = {
  get(id) {
    return transactionRepository.find(id);
  },

  list() {
    return transactionRepository.findAll();
  },

  listByUser(id) {
    // GET TRANSACTION BY USER ID
    return transactionRepository.findAll({where: {userId: id}});
  },

  create(args) {
    return transactionRepository.create(args);
  },
};
