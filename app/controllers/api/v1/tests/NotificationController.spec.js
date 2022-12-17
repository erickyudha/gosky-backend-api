const mock = require('../../../../../tests/mock');
const {
  UnauthorizedError,
  IdNotFoundError,
  GeneralError,
} = require('../../../../errors');
const NotificationController = require('../NotificationController');

describe('NotificationController', () => {
  describe('#handleList', () => {
    it('should res.status(200) if success', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
      };
      const mockRes = mock.RES;

      const mockNotifService = {
        listByUser: jest.fn().mockReturnValue([
          mock.NOTIFICATION,
        ]),
      };
      const controller = new NotificationController(mockNotifService);
      await controller.handleList(mockReq, mockRes);

      expect(mockNotifService.listByUser).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'get notification list success',
        data: [mock.NOTIFICATION],
        meta: {
          count: 1,
        },
      });
    });

    it('should res.status(500) to handle general error', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
      };
      const mockRes = mock.RES;
      const err = new GeneralError('test error');

      const mockNotifService = {
        listByUser: jest.fn().mockRejectedValue(err),
      };
      const controller = new NotificationController(mockNotifService);
      await controller.handleList(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err.json());
    });
  });

  describe('#handleMarkAsRead', () => {
    it('should res.status(200) if success', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
        params: {
          id: 1,
        },
      };
      const mockRes = mock.RES;

      const mockNotifService = {
        get: jest.fn().mockReturnValue(mock.NOTIFICATION),
        markAsRead: jest.fn(),
      };
      const controller = new NotificationController(mockNotifService);
      await controller.handleMarkAsRead(mockReq, mockRes);

      expect(mockNotifService.get).toHaveBeenCalled();
      expect(mockNotifService.markAsRead).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'notification marked as read',
      });
    });

    it('should res.status(401) if user try to access other user notification',
        async () => {
          const mockUser = mock.USER;
          const mockReq = {
            user: mockUser,
            params: {
              id: 1,
            },
          };
          const mockRes = mock.RES;

          const mockNotifService = {
            get: jest.fn().mockReturnValue({...mock.NOTIFICATION, userId: 2}),
            markAsRead: jest.fn(),
          };
          const controller = new NotificationController(mockNotifService);
          await controller.handleMarkAsRead(mockReq, mockRes);

          expect(mockNotifService.get).toHaveBeenCalled();
          expect(mockRes.status).toHaveBeenCalledWith(401);
          expect(mockRes.json).toHaveBeenCalledWith(
              new UnauthorizedError().json(),
          );
        });

    it('should res.status(404) if id not found', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
        params: {
          id: 12,
        },
      };
      const mockRes = mock.RES;

      const mockNotifService = {
        get: jest.fn().mockReturnValue(null),
        markAsRead: jest.fn(),
      };
      const controller = new NotificationController(mockNotifService);
      await controller.handleMarkAsRead(mockReq, mockRes);

      expect(mockNotifService.get).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(new IdNotFoundError().json());
    });

    it('should res.status(500) to handle general error', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
        params: {
          id: 1,
        },
      };
      const mockRes = mock.RES;
      const err = new GeneralError('test error');
      const mockNotifService = {
        get: jest.fn().mockRejectedValue(err),
        markAsRead: jest.fn(),
      };
      const controller = new NotificationController(mockNotifService);
      await controller.handleMarkAsRead(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err.json());
    });
  });
});
