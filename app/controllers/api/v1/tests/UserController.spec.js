const mock = require('../../../../../tests/mock');
const {
  IdNotFoundError,
  GeneralError,
  MissingFieldError,
} = require('../../../../errors');
const UserController = require('../UserController');
const authService = require('../../../../services/authService');

describe('UserController', () => {
  describe('#handleGetSimpleUser', () => {
    it('should res.status(200) if success', async () => {
      const mockUser = mock.USER;
      const mockSimpleUser = {
        id: mockUser.id,
        name: mockUser.name,
        role: mockUser.role,
        imageUrl: mockUser.imageUrl,
      };
      const mockReq = {
        params: {
          id: 1,
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        simpleGet: jest.fn().mockReturnValue(mockSimpleUser),
      };

      const controller = new UserController(mockUserService, {});
      await controller.handleGetSimpleUser(mockReq, mockRes);

      expect(mockUserService.simpleGet).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'get user data success',
        data: mockSimpleUser,
      });
    });

    it('should res.status(404) if id not found', async () => {
      const mockReq = {
        params: {
          id: 999,
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        simpleGet: jest.fn().mockReturnValue(null),
      };

      const controller = new UserController(mockUserService, {});
      await controller.handleGetSimpleUser(mockReq, mockRes);

      expect(mockUserService.simpleGet).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(new IdNotFoundError().json());
    });

    it('should res.status(500) to handle general error', async () => {
      const mockReq = {
        params: {
          id: 1,
        },
      };
      const mockRes = mock.RES;
      const err = new GeneralError('error test');
      const mockUserService = {
        simpleGet: jest.fn().mockRejectedValue(err),
      };

      const controller = new UserController(mockUserService, {});
      await controller.handleGetSimpleUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err.json());
    });
  });

  describe('#handleUpdateUser', () => {
    it('should res.status(200) if success', async () => {
      const mockUser = mock.USER;
      const updateBody = {
        name: 'sussy',
        phone: '03183971937',
        address: 'skeld',
        imageId: 'sample',
        imageUrl: 'image.com/image.png',
      };
      const mockReq = {
        body: updateBody,
        user: mockUser,
      };
      const mockRes = mock.RES;

      const mockUserService = {
        update: jest.fn().mockReturnValue([1]),
        get: jest.fn().mockReturnValue({
          ...mockUser, ...updateBody,
        }),
      };

      const controller = new UserController(mockUserService, {});
      await controller.handleUpdateUser(mockReq, mockRes);

      expect(mockUserService.update).toHaveBeenCalled();
      expect(mockUserService.get).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'update user data success',
        data: {
          ...mockUser, ...updateBody,
        },
      });
    });

    it('should res.status(500) to handle general error', async () => {
      const mockUser = mock.USER;
      const updateBody = {
        name: 'sussy',
        phone: '03183971937',
        address: 'skeld',
        imageId: 'sample',
        imageUrl: 'image.com/image.png',
      };
      const mockReq = {
        body: updateBody,
        user: mockUser,
      };
      const mockRes = mock.RES;
      const err = new GeneralError('error test');
      const mockUserService = {
        update: jest.fn().mockRejectedValue(err),
        get: jest.fn().mockReturnValue({
          ...mockUser, ...updateBody,
        }),
      };

      const controller = new UserController(mockUserService, {});
      await controller.handleUpdateUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err.json());
    });
  });

  describe('#handleUpdateUserEmail', () => {
    it('should res.status(200) if success', async () => {
      const mockUser = mock.USER;
      const [mockOtp, mockOtpToken] =
        authService.createOtpToken(mockUser.email);
      const mockReq = {
        user: mockUser,
        body: {
          otp: mockOtp,
          otpToken: mockOtpToken,
        },
      };
      const mockRes = mock.RES;

      const mockUserService = {
        update: jest.fn().mockReturnValue([1]),
        get: jest.fn().mockReturnValue(mockUser),
      };

      const controller = new UserController(mockUserService, authService);
      await controller.handleUpdateUserEmail(mockReq, mockRes);

      expect(mockUserService.update).toHaveBeenCalled();
      expect(mockUserService.get).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'update user email success',
        data: mockUser,
      });
    });

    it('should res.status(400) if missing required field(s)', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        user: mockUser,
        body: {},
      };
      const mockRes = mock.RES;

      const mockUserService = {
        update: jest.fn().mockReturnValue([1]),
        get: jest.fn().mockReturnValue(mockUser),
      };

      const controller = new UserController(mockUserService, authService);
      await controller.handleUpdateUserEmail(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(new MissingFieldError().json());
    });

    it('should res.status(422) if otp invalid', async () => {
      const mockUser = mock.USER;
      const [mockOtp, mockOtpToken] =
        authService.createOtpToken(mockUser.email);
      const mockReq = {
        user: mockUser,
        body: {
          otp: mockOtp + 'wadad',
          otpToken: mockOtpToken,
        },
      };
      const mockRes = mock.RES;

      const controller = new UserController({}, authService);
      await controller.handleUpdateUserEmail(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(422);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'failed',
        message: 'wrong otp or invalid otpToken',
      });
    });

    it('should res.status(500) to handle general error', async () => {
      const mockUser = mock.USER;
      const [mockOtp, mockOtpToken] =
        authService.createOtpToken(mockUser.email);
      const mockReq = {
        user: mockUser,
        body: {
          otp: mockOtp,
          otpToken: mockOtpToken,
        },
      };
      const mockRes = mock.RES;
      const err = new GeneralError('error test');
      const mockUserService = {
        update: jest.fn().mockRejectedValue(err),
        get: jest.fn().mockReturnValue(mockUser),
      };

      const controller = new UserController(mockUserService, authService);
      await controller.handleUpdateUserEmail(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err.json());
    });
  });

  describe('#handleUpdateUserPassword', () => {
    it('should res.status(200) if update pass success', async () => {
      const mockReq = {
        user: mock.USER,
        body: {
          password: 'string',
          newPassword: 'password',
        },
      };
      const mockRes = mock.RES;

      const mockAuthService = {
        verifyPassword: jest.fn().mockReturnValue(true),
        encryptPassword: jest.fn().mockReturnValue('encrytptedpassword'),
      };
      const mockUserService = {
        update: jest.fn(),
        get: jest.fn().mockReturnValue({
          ...mock.USER,
          encryptedPassword: 'encrytptedpassword',
        }),
      };

      const controller = new UserController(mockUserService, mockAuthService);
      await controller.handleUpdateUserPassword(mockReq, mockRes);

      expect(mockAuthService.verifyPassword).toHaveBeenCalled();
      expect(mockUserService.update).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'reset password success',
        data: {
          ...mock.USER,
          encryptedPassword: 'encrytptedpassword',
        },
      });
    });

    it('should res.status(400) missing req field(s)', async () => {
      const mockReq = {
        user: mock.USER,
        body: {},
      };
      const mockRes = mock.RES;

      const mockAuthService = {
        verifyPassword: jest.fn().mockReturnValue(true),
        encryptPassword: jest.fn().mockReturnValue('encrytptedpassword'),
      };
      const mockUserService = {
        update: jest.fn(),
        get: jest.fn().mockReturnValue({
          ...mock.USER,
          encryptedPassword: 'encrytptedpassword',
        }),
      };

      const controller = new UserController(mockUserService, mockAuthService);
      await controller.handleUpdateUserPassword(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(new MissingFieldError().json());
    });

    it('should res.status(401) if old password wrong', async () => {
      const mockReq = {
        user: mock.USER,
        body: {
          password: 'awda',
          newPassword: 'daidnal',
        },
      };
      const mockRes = mock.RES;

      const mockAuthService = {
        verifyPassword: jest.fn().mockReturnValue(false),
        encryptPassword: jest.fn().mockReturnValue('encrytptedpassword'),
      };
      const mockUserService = {
        update: jest.fn(),
        get: jest.fn().mockReturnValue({
          ...mock.USER,
          encryptedPassword: 'encrytptedpassword',
        }),
      };

      const controller = new UserController(mockUserService, mockAuthService);
      await controller.handleUpdateUserPassword(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'failed',
        message: 'wrong password',
      });
    });

    it('should res.status(500) to handle general error', async () => {
      const mockReq = {
        user: mock.USER,
        body: {
          password: 'awda',
          newPassword: 'daidnal',
        },
      };
      const mockRes = mock.RES;
      const err = new GeneralError('test');
      const mockAuthService = {
        verifyPassword: jest.fn().mockReturnValue(true),
        encryptPassword: jest.fn().mockReturnValue('encrytptedpassword'),
      };
      const mockUserService = {
        update: jest.fn().mockRejectedValue(err),
        get: jest.fn().mockReturnValue({
          ...mock.USER,
          encryptedPassword: 'encrytptedpassword',
        }),
      };

      const controller = new UserController(mockUserService, mockAuthService);
      await controller.handleUpdateUserPassword(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err.json());
    });
  });
});
