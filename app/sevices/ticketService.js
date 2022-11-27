const {ticketRepository} = require('../repositories');

module.exports = {
  async list(filterArgs) {
    const ticketList = await ticketRepository.findAll();
    if (!filter) {
      return ticketList;
    } else {
      return ticketList.filter((ticket) => {
        // TODO: Write filter function here
      });
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
