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

  delete(id) {
    return User.destroy({where: {id}});
  },

  find(id) {
    return User.findByPk(id);
  },

  attributesFind(id, attributesArr) {
    return User.findByPk(id, {
      attributes: attributesArr,
    });
  },

  findByEmail(email) {
    return User.findOne({where: {email}});
  },
};
