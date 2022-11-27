const {ticketRepository} = require('../repositories');

module.exports = {
  list() {
    return ticketRepository.findAll();
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
