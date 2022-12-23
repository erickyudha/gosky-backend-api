const {transactionRepository, ticketRepository} = require('../repositories');
const {Op} = require('sequelize');

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

  async calculateEarnings(filter) {
    const now = new Date();
    const filterArgs = {};
    let date;
    if (filter == 'TODAY') {
      date = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    } else if (filter == 'MONTH') {
      date = `${now.getFullYear()}-${now.getMonth()}-1`;
    } else {
      date = `${now.getFullYear()}-1-1`;
    }
    filterArgs['createdAt'] = {
      [Op.gte]: date,
    };
    const transactions =
      await transactionRepository.findAll({where: filterArgs});

    let earnings = 0;
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      const ticket = await ticketRepository.forceFind(transaction.ticketId);

      earnings += transaction.amount * ticket.price;
    }

    return {
      earnings, count: transactions.length,
    };
  },
};
