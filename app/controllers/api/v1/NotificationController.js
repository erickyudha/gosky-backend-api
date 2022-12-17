const {
  GeneralError,
  UnauthorizedError,
  IdNotFoundError,
} = require('../../../errors');
class NotificationController {
  constructor(notificationService) {
    this.notificationService = notificationService;
  };

  handleList = async (req, res) => {
    // Return user notification list
    try {
      const user = req.user;
      const listNotif = await this.notificationService.listByUser(user.id);
      res.status(200).json({
        status: 'success',
        message: 'get notification list success',
        data: listNotif,
        meta: {
          count: listNotif.length,
        },
      });
    } catch (err) {
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
    }
  };

  handleMarkAsRead = async (req, res) => {
    // Mark notification as read by id
    try {
      const user = req.user;
      const notification = await this.notificationService.get(req.params.id);
      if (!notification) {
        const err = new IdNotFoundError();
        res.status(404).json(err.json());
        return;
      }
      if (user.id != notification.userId) {
        const error = new UnauthorizedError();
        res.status(401).json(error.json());
        return;
      }
      await this.notificationService.markAsRead(notification.id);
      res.status(200).json({
        status: 'success',
        message: 'notification marked as read',
      });
    } catch (err) {
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
    }
  };
};

module.exports = NotificationController;
