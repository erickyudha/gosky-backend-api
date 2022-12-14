const {notificationRepository} = require('../repositories');

module.exports = {
  get(id) {
    return notificationRepository.find(id);
  },

  listByUser(userId) {
    return notificationRepository.findAll({where: {userId}});
  },

  create(message) {
    return notificationRepository.create(message);
  },

  markAsRead(id) {
    return notificationRepository.update(id, {isRead: true});
  },
};
