const {Ticket} = require('../models');

module.exports = {
  findAll() {
    return Ticket.findAll({
      limit: 100,
    });
  },

  find(id) {
    return Ticket.findByPk(id);
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
