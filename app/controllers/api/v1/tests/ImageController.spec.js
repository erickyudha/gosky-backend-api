const ImageController = require('../ImageController');
const mock = require('../../../../../tests/mock');
const {MissingFieldError, UnauthorizedError} = require('../../../../errors');

describe('ImageController', () => {
  describe('#handleUpload', () => {
    it('should res.status(201) if upload success', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
        query: {
          type: 'PROFILE_IMG',
        },
        file: {
          buffer: Buffer.from('Im a string!', 'utf-8'),
        },
      };
      const mockRes = mock.RES;

      const mockImageService = {
        upload: jest.fn().mockReturnValue(mock.UP_IMAGE),
      };

      const controller = new ImageController(mockImageService);
      await controller.handleUpload(mockReq, mockRes);

      expect(mockImageService.upload).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'upload image success',
        data: mock.IMAGE,
      });
    });

    it('should res.status(400) if param(s) missing', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
        query: {},
        file: {
          buffer: Buffer.from('Im a string!', 'utf-8'),
        },
      };
      const mockRes = mock.RES;

      const mockImageService = {
        upload: jest.fn().mockReturnValue(mock.UP_IMAGE),
      };

      const controller = new ImageController(mockImageService);
      await controller.handleUpload(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(new MissingFieldError().json());
    });

    it('should res.status(401) if USER try to upload TICKET_IMG', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
        query: {
          type: 'TICKET_IMG',
        },
        file: {
          buffer: Buffer.from('Im a string!', 'utf-8'),
        },
      };
      const mockRes = mock.RES;

      const mockImageService = {
        upload: jest.fn().mockReturnValue(mock.UP_IMAGE),
      };

      const controller = new ImageController(mockImageService);
      await controller.handleUpload(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith(new UnauthorizedError().json());
    });

    it('should res.status(401) if ADMIN try to upload rand type', async () => {
      const mockUser = mock.ADMIN;
      const mockReq = {
        user: mockUser,
        query: {
          type: 'amongus_IMG',
        },
        file: {
          buffer: Buffer.from('Im a string!', 'utf-8'),
        },
      };
      const mockRes = mock.RES;

      const mockImageService = {
        upload: jest.fn().mockReturnValue(mock.UP_IMAGE),
      };

      const controller = new ImageController(mockImageService);
      await controller.handleUpload(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith(new UnauthorizedError().json());
    });
  });

  describe('#handleDelete', () => {
    it('should res.status(200) if operation executed', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
        query: {
          imageId: mock.IMAGE.imageId,
          type: 'PROFILE_IMG',
        },
      };
      const mockRes = mock.RES;

      const mockImageService = {
        delete: jest.fn(),
      };

      const controller = new ImageController(mockImageService);
      await controller.handleDelete(mockReq, mockRes);

      expect(mockImageService.delete).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'delete image success',
      });
    });

    it('should res.status(400) if param(s) missing', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
        query: {},
      };
      const mockRes = mock.RES;

      const mockImageService = {
        delete: jest.fn(),
      };

      const controller = new ImageController(mockImageService);
      await controller.handleDelete(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(new MissingFieldError().json());
    });

    it('should res.status(401) if USER try to delete TICKET_IMG', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
        query: {
          imageId: mock.IMAGE.imageId,
          type: 'TICKET_IMG',
        },
      };
      const mockRes = mock.RES;

      const mockImageService = {
        delete: jest.fn(),
      };

      const controller = new ImageController(mockImageService);
      await controller.handleDelete(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith(new UnauthorizedError().json());
    });

    it('should res.status(401) if ADMIN try to delete rand type', async () => {
      const mockUser = mock.ADMIN;
      const mockReq = {
        user: mockUser,
        query: {
          imageId: mock.IMAGE.imageId,
          type: 'amogus_IMG',
        },
      };
      const mockRes = mock.RES;

      const mockImageService = {
        delete: jest.fn(),
      };

      const controller = new ImageController(mockImageService);
      await controller.handleDelete(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith(new UnauthorizedError().json());
    });
  });
});
