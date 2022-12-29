const {User} = require('../models');

module.exports = {
  create(args) {
    return User.create(args);
  },

  update(id, args) {
    return User.update(args, {
      where: {
        id,
      },
      paranoid: false,
    });
  },

  findAll(args) {
    return User.findAll(args);
  },

  delete(id) {
    return User.destroy({where: {id}});
  },

  find(id) {
    return User.findByPk(id);
  },

  attributesFind(id, attributesArr) {
    return User.findByPk(id, {
      attributes: attributesArr,
      paranoid: false,
    });
  },

  findByEmail(email) {
    return User.findOne({where: {email}});
  },
};
