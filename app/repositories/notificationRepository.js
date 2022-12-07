const {Notification} = require('../models');

module.exports = {
  find(id) {
    return Notification.findByPk(id);
  },

  findAll(args) {
    return Notification.findAll(args);
  },

  create(args) {
    return Notification.create(args);
  },

  update(id, args) {
    return Notification.update(args, {
      where: {
        id,
      },
      paranoid: false,
    });
  },
};
