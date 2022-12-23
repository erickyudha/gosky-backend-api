const {Ticket} = require('../models');

module.exports = {
  findAll(args) {
    return Ticket.findAll(args);
  },

  findOne(args) {
    return Ticket.findOne(args);
  },

  find(id) {
    return Ticket.findByPk(id);
  },

  forceFind(id) {
    return Ticket.findByPk(id, {
      paranoid: false,
    });
  },

  create(args) {
    return Ticket.create(args);
  },

  update(id, args) {
    return Ticket.update(args, {
      where: {
        id,
      },
      paranoid: false,
    });
  },

  delete(id) {
    return Ticket.destroy({where: {id}});
  },
};
