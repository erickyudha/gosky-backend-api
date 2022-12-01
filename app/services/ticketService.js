const { Op } = require('sequelize');
const {ticketRepository} = require('../repositories');

module.exports = {
  async list(filterArgs) {
    const {
      category = null,
      from = null,
      to = null,
      departureTime = null,
      returntime = null,
    } = filterArgs;
    const filter = {};
    if (category) filter['category'] = category;
    if (from) filter['from'] = from;
    if (to) filter['to'] = to;
    if (departureTime) {
      filter['departureTime'] = {
        [Op.gte]: departureTime,
      };
    }
    if (category == 'ROUND_TRIP' && returntime) {
      filter['returnTime'] = {
        [Op.gte]: returntime,
      };
    }
    return ticketRepository.findAll({where: filter, limit: 100});
  },

  create(args) {
    return ticketRepository.create(args);
  },

  get(id) {
    return ticketRepository.find(id);
  },

  update(id, args) {
    return ticketRepository.update(id, args);
  },

  delete(id) {
    return ticketRepository.delete(id);
  },
};
