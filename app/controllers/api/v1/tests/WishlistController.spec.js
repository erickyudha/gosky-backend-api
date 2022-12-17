const mock = require('../../../../../tests/mock');
const {IdNotFoundError, GeneralError} = require('../../../../errors');
const WishlistController = require('../WishlistController');

describe('WishlistController', () => {
  describe('#handleGetList', () => {
    it('should res.status(200) if success', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
      };
      const mockRes = mock.RES;

      const mockWishlistService = {
        listByUser: jest.fn().mockReturnValue([mock.WISHLIST]),
      };
      const mockTicketService = {
        get: jest.fn().mockReturnValue(mock.TICKET),
      };

      const controller = new WishlistController(
          mockWishlistService, mockTicketService,
      );
      await controller.handleGetList(mockReq, mockRes);

      expect(mockWishlistService.listByUser).toHaveBeenCalled();
      expect(mockTicketService.get).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'wishlist ticket success',
        data: [mock.TICKET],
        meta: {count: 1},
      });
    });

    it('should res.status(500) to handle general error', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
      };
      const mockRes = mock.RES;
      const err = new GeneralError('error test');
      const mockWishlistService = {
        listByUser: jest.fn().mockRejectedValue(err),
      };
      const mockTicketService = {
        get: jest.fn().mockReturnValue(mock.TICKET),
      };

      const controller = new WishlistController(
          mockWishlistService, mockTicketService,
      );
      await controller.handleGetList(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err.json());
    });
  });

  describe('#handleCreate', () => {
    it('should res.status(200) if wishlist success', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
        params: {
          id: 1,
        },
      };
      const mockRes = mock.RES;

      const mockWishlistService = {
        getByData: jest.fn().mockReturnValue(null),
        add: jest.fn(),
      };
      const mockTicketService = {
        get: jest.fn().mockReturnValue(mock.TICKET),
      };

      const controller = new WishlistController(
          mockWishlistService, mockTicketService,
      );
      await controller.handleCreate(mockReq, mockRes);

      expect(mockTicketService.get).toHaveBeenCalled();
      expect(mockWishlistService.getByData).toHaveBeenCalled();
      expect(mockWishlistService.add).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'wishlist ticket success',
      });
    });

    it('should res.status(404) if ticket not found', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
        params: {
          id: 999,
        },
      };
      const mockRes = mock.RES;

      const mockWishlistService = {
        getByData: jest.fn().mockReturnValue(null),
        add: jest.fn(),
      };
      const mockTicketService = {
        get: jest.fn().mockReturnValue(null),
      };

      const controller = new WishlistController(
          mockWishlistService, mockTicketService,
      );
      await controller.handleCreate(mockReq, mockRes);

      expect(mockTicketService.get).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(new IdNotFoundError().json());
    });

    it('should res.status(409) if ticket already wishlisted', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
        params: {
          id: 1,
        },
      };
      const mockRes = mock.RES;

      const mockWishlistService = {
        getByData: jest.fn().mockReturnValue(mock.WISHLIST),
        add: jest.fn(),
      };
      const mockTicketService = {
        get: jest.fn().mockReturnValue(mock.TICKET),
      };

      const controller = new WishlistController(
          mockWishlistService, mockTicketService,
      );
      await controller.handleCreate(mockReq, mockRes);

      expect(mockTicketService.get).toHaveBeenCalled();
      expect(mockWishlistService.getByData).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(409);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'failed',
        message: 'ticket already wishlisted',
      });
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
      const err = new GeneralError('error test');
      const mockWishlistService = {
        getByData: jest.fn().mockReturnValue(null),
        add: jest.fn(),
      };
      const mockTicketService = {
        get: jest.fn().mockRejectedValue(err),
      };

      const controller = new WishlistController(
          mockWishlistService, mockTicketService,
      );
      await controller.handleCreate(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err.json());
    });
  });

  describe('#handleDelete', () => {
    it('should res.status(200) if unwishlist success', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
        params: {
          id: 1,
        },
      };
      const mockRes = mock.RES;

      const mockWishlistService = {
        delete: jest.fn(),
      };
      const mockTicketService = {
        get: jest.fn().mockReturnValue(mock.TICKET),
      };

      const controller = new WishlistController(
          mockWishlistService, mockTicketService,
      );
      await controller.handleDelete(mockReq, mockRes);

      expect(mockTicketService.get).toHaveBeenCalled();
      expect(mockWishlistService.delete).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'unwish ticket success',
      });
    });

    it('should res.status(404) if ticket not found', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
        params: {
          id: 1,
        },
      };
      const mockRes = mock.RES;

      const mockWishlistService = {
        delete: jest.fn(),
      };
      const mockTicketService = {
        get: jest.fn().mockReturnValue(null),
      };

      const controller = new WishlistController(
          mockWishlistService, mockTicketService,
      );
      await controller.handleDelete(mockReq, mockRes);

      expect(mockTicketService.get).toHaveBeenCalled();
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
      const err = new GeneralError('error test');
      const mockWishlistService = {
        delete: jest.fn(),
      };
      const mockTicketService = {
        get: jest.fn().mockRejectedValue(err),
      };

      const controller = new WishlistController(
          mockWishlistService, mockTicketService,
      );
      await controller.handleDelete(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err.json());
    });
  });
});
