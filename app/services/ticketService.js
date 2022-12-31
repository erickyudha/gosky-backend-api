const {Op} = require('sequelize');
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
        [Op.gte]: new Date(departureTime).toISOString(),
      };
    }
    if (category == 'ROUND_TRIP' && returntime) {
      filter['returnTime'] = {
        [Op.gte]: new Date(returntime).toISOString(),
      };
    }
    return ticketRepository.findAll({where: filter});
  },

  create(args) {
    return ticketRepository.create(args);
  },

  get(id) {
    return ticketRepository.find(id);
  },

  forceGet(id) {
    return ticketRepository.forceFind(id);
  },

  update(id, args) {
    return ticketRepository.update(id, args);
  },

  delete(id) {
    return ticketRepository.delete(id);
  },
};
