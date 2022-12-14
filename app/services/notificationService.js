const {notificationRepository} = require('../repositories');

module.exports = {
  get(id) {
    return notificationRepository.find(id);
  },

  listByUser(userId) {
    return notificationRepository.findAll({where: {userId}});
  },

  create(userId, message) {
    return notificationRepository.create({
      userId, message, isRead: false,
    });
  },

  markAsRead(id) {
    return notificationRepository.update(id, {isRead: true});
  },
};
