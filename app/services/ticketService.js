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
    const tickets = await ticketRepository.findAll();
    return tickets.filter((ticket) => {
      let isValid = true;
      if (category) {
        if (ticket.category != category) isValid = false;
      }
      if (from) {
        if (ticket.from != from) isValid = false;
      }
      if (to) {
        if (ticket.to != to) isValid = false;
      }
      if (departureTime) {
        if (ticket.departureTime < departureTime) isValid = false;
      }
      if (category == 'ROUND_TRIP' && returntime) {
        if (ticket.returntime < returntime) isValid = false;
      }

      return isValid;
    })
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
