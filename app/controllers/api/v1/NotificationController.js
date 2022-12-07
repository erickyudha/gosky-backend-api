class NotificationController {
  constructor(notificationService) {
    this.notificationService = notificationService;
  };

  handleList(req, res) {
    // TODO:
    // Return user notification list
  };

  handleMarkAsRead(req, res) {
    // TODO:
    // Mark notification as read by id
  };
};

module.exports = NotificationController;
