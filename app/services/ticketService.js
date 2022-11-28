const {ticketRepository} = require('../repositories');

module.exports = {
  async list(filterFunc = null) {
    const ticketList = await ticketRepository.findAll();
    if (!filterFunc) {
      return ticketList;
    } else {
      return ticketList.filter(filterFunc);
    };
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
