const mock = require('../../../../../tests/mock');
const AuthController = require('../AuthController');
const jwt = require('jsonwebtoken');
const authService = require('../../../../services/authService');
const {
  UnauthorizedError,
  GeneralError,
  MissingFieldError,
} = require('../../../../errors');
const {EMAIL_SIGNATURE_KEY} = require('../../../../../config/application');

const returnMockOtp = (email) => {
  const otp = '' + Math.floor(100000 + Math.random() * 900000);
  const token = jwt.sign({
    otp, email,
  }, EMAIL_SIGNATURE_KEY);
  return [otp, token];
};

describe('AuthController', () => {
  describe('#baseAuthorize', () => {
    it('should save user data in req and go to next if success', async () => {
      const mockUser = mock.USER;
      const token = authService.createTokenFromUser(mockUser);
      const mockReq = {
        headers: {
          authorization: 'Bearer ' + token,
        },
        user: jest.fn().mockReturnThis(),
      };
      const mockRes = mock.RES;
      const mockUserService = {
        get: jest.fn().mockReturnValue(mockUser),
      };
      const mockNext = jest.fn();

      const controller = new AuthController(authService, mockUserService, {});
      await controller.baseAuthorize(mockReq, mockRes, mockNext, ['USER']);

      expect(mockUserService.get).toHaveBeenCalled();
      expect(mockReq.user).toEqual(mockUser);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should res.status(401) unauthorized if role not match', async () => {
      const mockUser = mock.USER;
      const token = authService.createTokenFromUser(mockUser);
      const mockReq = {
        headers: {
          authorization: 'Bearer ' + token,
        },
        user: jest.fn().mockReturnThis(),
      };
      const mockRes = mock.RES;
      const mockUserService = {
        get: jest.fn().mockReturnValue(mockUser),
      };
      const mockNext = jest.fn();

      const controller = new AuthController(authService, mockUserService, {});
      await controller.baseAuthorize(mockReq, mockRes, mockNext, ['ADMIN']);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith(new UnauthorizedError().json());
    });

    it('should res.status(500) if token invalid', async () => {
      const mockUser = mock.USER;
      const token = authService.createTokenFromUser(mockUser) + 'amogus';
      const mockReq = {
        headers: {
          authorization: 'Bearer ' + token,
        },
        user: jest.fn().mockReturnThis(),
      };
      const mockRes = mock.RES;
      const mockUserService = {
        get: jest.fn().mockReturnValue(mockUser),
      };
      const mockNext = jest.fn();

      const controller = new AuthController(authService, mockUserService, {});
      await controller.baseAuthorize(mockReq, mockRes, mockNext, ['ADMIN']);
      const err = new GeneralError('invalid bearer token').json();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err);
    });
  });

  describe('#authorizeUser', () => {
    it('should save user data in req and go to next if success', async () => {
      const mockUser = mock.USER;
      const token = authService.createTokenFromUser(mockUser);
      const mockReq = {
        headers: {
          authorization: 'Bearer ' + token,
        },
        user: jest.fn().mockReturnThis(),
      };
      const mockRes = mock.RES;
      const mockUserService = {
        get: jest.fn().mockReturnValue(mockUser),
      };
      const mockNext = jest.fn();

      const controller = new AuthController(authService, mockUserService, {});
      await controller.authorizeUser(mockReq, mockRes, mockNext);

      expect(mockUserService.get).toHaveBeenCalled();
      expect(mockReq.user).toEqual(mockUser);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should still success if admin try to access', async () => {
      const mockAdmin = mock.ADMIN;
      const token = authService.createTokenFromUser(mockAdmin);
      const mockReq = {
        headers: {
          authorization: 'Bearer ' + token,
        },
        user: jest.fn().mockReturnThis(),
      };
      const mockRes = mock.RES;
      const mockUserService = {
        get: jest.fn().mockReturnValue(mockAdmin),
      };
      const mockNext = jest.fn();

      const controller = new AuthController(authService, mockUserService, {});
      await controller.authorizeUser(mockReq, mockRes, mockNext);

      expect(mockUserService.get).toHaveBeenCalled();
      expect(mockReq.user).toEqual(mockAdmin);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should res.status(500) if token invalid', async () => {
      const mockUser = mock.USER;
      const token = authService.createTokenFromUser(mockUser) + 'amogus';
      const mockReq = {
        headers: {
          authorization: 'Bearer ' + token,
        },
        user: jest.fn().mockReturnThis(),
      };
      const mockRes = mock.RES;
      const mockUserService = {
        get: jest.fn().mockReturnValue(mockUser),
      };
      const mockNext = jest.fn();

      const controller = new AuthController(authService, mockUserService, {});
      await controller.authorizeUser(mockReq, mockRes, mockNext, ['ADMIN']);
      const err = new GeneralError('invalid bearer token').json();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err);
    });
  });

  describe('#authorizeAdmin', () => {
    it('should save user data in req and go to next if success', async () => {
      const mockAdmin = mock.ADMIN;
      const token = authService.createTokenFromUser(mockAdmin);
      const mockReq = {
        headers: {
          authorization: 'Bearer ' + token,
        },
        user: jest.fn().mockReturnThis(),
      };
      const mockRes = mock.RES;
      const mockUserService = {
        get: jest.fn().mockReturnValue(mockAdmin),
      };
      const mockNext = jest.fn();

      const controller = new AuthController(authService, mockUserService, {});
      await controller.authorizeAdmin(mockReq, mockRes, mockNext);

      expect(mockUserService.get).toHaveBeenCalled();
      expect(mockReq.user).toEqual(mockAdmin);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should res.status(401) if user try to access', async () => {
      const mockUser = mock.USER;
      const token = authService.createTokenFromUser(mockUser);
      const mockReq = {
        headers: {
          authorization: 'Bearer ' + token,
        },
        user: jest.fn().mockReturnThis(),
      };
      const mockRes = mock.RES;
      const mockUserService = {
        get: jest.fn().mockReturnValue(mockUser),
      };
      const mockNext = jest.fn();

      const controller = new AuthController(authService, mockUserService, {});
      await controller.authorizeAdmin(mockReq, mockRes, mockNext, ['ADMIN']);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith(new UnauthorizedError().json());
    });

    it('should res.status(500) if token invalid', async () => {
      const mockUser = mock.USER;
      const token = authService.createTokenFromUser(mockUser) + 'amogus';
      const mockReq = {
        headers: {
          authorization: 'Bearer ' + token,
        },
        user: jest.fn().mockReturnThis(),
      };
      const mockRes = mock.RES;
      const mockUserService = {
        get: jest.fn().mockReturnValue(mockUser),
      };
      const mockNext = jest.fn();

      const controller = new AuthController(authService, mockUserService, {});
      await controller.authorizeAdmin(mockReq, mockRes, mockNext, ['ADMIN']);
      const err = new GeneralError('invalid bearer token').json();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err);
    });
  });

  describe('#authorizeOptional', () => {
    it('should save user data in req and go to next if success', async () => {
      const mockUser = mock.USER;
      const token = authService.createTokenFromUser(mockUser);
      const mockReq = {
        headers: {
          authorization: 'Bearer ' + token,
        },
        user: jest.fn().mockReturnThis(),
      };
      const mockRes = mock.RES;
      const mockUserService = {
        get: jest.fn().mockReturnValue(mockUser),
      };
      const mockNext = jest.fn();

      const controller = new AuthController(authService, mockUserService, {});
      await controller.authorizeOptional(mockReq, mockRes, mockNext);

      expect(mockUserService.get).toHaveBeenCalled();
      expect(mockReq.user).toEqual(mockUser);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should req.user = null and go next if token invalid', async () => {
      const mockUser = mock.USER;
      const token = authService.createTokenFromUser(mockUser) + 'amogus';
      const mockReq = {
        headers: {
          authorization: 'Bearer ' + token,
        },
        user: jest.fn().mockReturnThis(),
      };
      const mockRes = mock.RES;
      const mockUserService = {
        get: jest.fn().mockReturnValue(mockUser),
      };
      const mockNext = jest.fn();

      const controller = new AuthController(authService, mockUserService, {});
      await controller.authorizeOptional(mockReq, mockRes, mockNext);

      expect(mockReq.user).toEqual(null);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('#handleRegister', () => {
    it('should res.status(201) if register success', async () => {
      const mockUser = mock.USER;
      const mockSqUser = {
        dataValues: mock.USER,
      };
      const [mockOtp, mockToken] = returnMockOtp(mockUser.email);
      const mockReq = {
        body: {
          name: mockUser.name,
          password: 'password',
          otp: mockOtp,
          otpToken: mockToken,
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        create: jest.fn().mockReturnValue(mockSqUser),
        getByEmail: jest.fn().mockReturnValue(null),
      };

      const controller = new AuthController(authService, mockUserService, {});
      await controller.handleRegister(mockReq, mockRes);

      expect(mockUserService.getByEmail).toHaveBeenCalled();
      expect(mockUserService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    it('should res.status(400) if missing req field(s)', async () => {
      const mockUser = mock.USER;
      const mockSqUser = {
        dataValues: mock.USER,
      };
      const mockOtp = returnMockOtp(mockUser.email)[0];
      const mockReq = {
        body: {
          name: mockUser.name,
          password: 'password',
          otp: mockOtp,
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        create: jest.fn().mockReturnValue(mockSqUser),
        getByEmail: jest.fn().mockReturnValue(null),
      };

      const controller = new AuthController(authService, mockUserService, {});
      await controller.handleRegister(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(new MissingFieldError().json());
    });

    it('should res.status(409) if email already registered', async () => {
      const mockUser = mock.USER;
      const mockSqUser = {
        dataValues: mock.USER,
      };
      const [mockOtp, mockToken] = returnMockOtp(mockUser.email);
      const mockReq = {
        body: {
          name: mockUser.name,
          password: 'password',
          otp: mockOtp,
          otpToken: mockToken,
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        create: jest.fn().mockReturnValue(mockSqUser),
        getByEmail: jest.fn().mockReturnValue(mockUser),
      };

      const controller = new AuthController(authService, mockUserService, {});
      await controller.handleRegister(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(409);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'failed',
        message: 'email already registered',
      });
    });

    it('should res.status(422) if otp invalid', async () => {
      const mockUser = mock.USER;
      const mockSqUser = {
        dataValues: mock.USER,
      };
      const [mockOtp, mockToken] = returnMockOtp(mockUser.email);
      const mockReq = {
        body: {
          name: mockUser.name,
          password: 'password',
          otp: mockOtp + 'amogus',
          otpToken: mockToken,
        },
      };
      const mockRes = mock.RES;
      const mockUserService = {
        create: jest.fn().mockReturnValue(mockSqUser),
        getByEmail: jest.fn().mockReturnValue(null),
      };

      const controller = new AuthController(authService, mockUserService, {});
      await controller.handleRegister(mockReq, mockRes);

      const error = new GeneralError('Invalid OTP or OTP Token');

      expect(mockRes.status).toHaveBeenCalledWith(422);
      expect(mockRes.json).toHaveBeenCalledWith(error.json());
    });

    it('should res.status(500) to handle general error', async () => {
      const mockUser = mock.USER;
      const mockSqUser = {
        dataValues: mock.USER,
      };
      const [mockOtp, mockToken] = returnMockOtp(mockUser.email);
      const mockReq = {
        body: {
          name: mockUser.name,
          password: 'password',
          otp: mockOtp,
          otpToken: mockToken,
        },
      };
      const err = new GeneralError('test error');
      const mockRes = mock.RES;
      const mockUserService = {
        create: jest.fn().mockReturnValue(mockSqUser),
        getByEmail: jest.fn().mockRejectedValue(err),
      };

      const controller = new AuthController(authService, mockUserService, {});
      await controller.handleRegister(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err.json());
    });
  });

  describe('#handleLogin', () => {
    it('should res.status(200) if login success', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        body: {
          email: mockUser.email,
          password: 'password',
        },
      };
      const mockRes = mock.RES;

      const mockUserService = {
        getByEmail: jest.fn().mockReturnValue({
          ...mockUser,
          dataValues: mockUser,
        }),
      };

      const controller = new AuthController(authService, mockUserService, {});
      await controller.handleLogin(mockReq, mockRes);

      expect(mockUserService.getByEmail).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it('should res.status(400) if missing req field(s)', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        body: {},
      };
      const mockRes = mock.RES;

      const mockUserService = {
        getByEmail: jest.fn().mockReturnValue({
          ...mockUser,
          dataValues: mockUser,
        }),
      };

      const controller = new AuthController(authService, mockUserService, {});
      await controller.handleLogin(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(new MissingFieldError().json());
    });

    it('should res.status(404) if email not registered', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        body: {
          email: mockUser.email,
          password: 'password',
        },
      };
      const mockRes = mock.RES;

      const mockUserService = {
        getByEmail: jest.fn().mockReturnValue(null),
      };

      const controller = new AuthController(authService, mockUserService, {});
      await controller.handleLogin(mockReq, mockRes);

      expect(mockUserService.getByEmail).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'failed',
        message: 'Email is not registered',
      });
    });

    it('should res.status(401) if password wrong', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        body: {
          email: mockUser.email,
          password: 'sussy',
        },
      };
      const mockRes = mock.RES;

      const mockUserService = {
        getByEmail: jest.fn().mockReturnValue({
          ...mockUser,
          dataValues: mockUser,
        }),
      };

      const controller = new AuthController(authService, mockUserService, {});
      await controller.handleLogin(mockReq, mockRes);

      expect(mockUserService.getByEmail).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'failed',
        message: 'Wrong password',
      });
    });

    it('should res.status(500) to handle general error', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        body: {
          email: mockUser.email,
          password: 'password',
        },
      };
      const mockRes = mock.RES;
      const err = new GeneralError('test error');
      const mockUserService = {
        getByEmail: jest.fn().mockRejectedValue(err),
      };

      const controller = new AuthController(authService, mockUserService, {});
      await controller.handleLogin(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json)
          .toHaveBeenCalledWith(err.json());
    });
  });

  describe('#handleGetSelf', () => {
    it('should res.status(200) if success', async () => {
      const mockReq = {
        user: mock.USER,
      };
      const mockRes = mock.RES;

      const controller = new AuthController({}, {}, {});
      await controller.handleGetSelf(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'get user data success',
        data: mockReq.user,
      });
    });
  });

  describe('#handleGetOtp', () => {
    it('should res.status(200) if request otp success', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        query: {
          email: mockUser.email,
        },
      };
      const mockRes = mock.RES;
      const mockEmailService = {
        sendOtpEmail: jest.fn()
            .mockImplementation((email, otp, handler) => {
              const err = null;
              const info = {
                email, otp,
              };
              handler(err, info);
            }),
      };
      const controller =
        new AuthController(authService, {}, mockEmailService);
      await controller.handleGetOtp(mockReq, mockRes);

      expect(mockEmailService.sendOtpEmail).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it('should res.status(400) if missing req field', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        query: {},
      };
      const mockRes = mock.RES;
      const mockUserService = {
        getByEmail: jest.fn().mockReturnValue(mockUser),
      };
      const mockEmailService = {
        sendOtpEmail: jest.fn().mockReturnThis(),
      };
      const controller =
        new AuthController(authService, mockUserService, mockEmailService);
      await controller.handleGetOtp(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(new MissingFieldError().json());
    });

    it('should res.status(422) if email format wrong', async () => {
      const mockReq = {
        query: {
          email: 'thats_kinda_sus',
        },
      };
      const mockRes = mock.RES;

      const mockEmailService = {
        sendOtpEmail: jest.fn().mockReturnThis(),
      };
      const controller =
        new AuthController(authService, {}, mockEmailService);
      await controller.handleGetOtp(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(422);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'failed',
        message: 'wrong email format',
      });
    });

    it('should res.status(500) to handle general error', async () => {
      const mockUser = mock.USER;
      const mockReq = {
        query: {
          email: mockUser.email,
        },
      };
      const mockRes = mock.RES;
      const err = new GeneralError('test error');

      const mockEmailService = {
        sendOtpEmail: jest.fn()
            .mockImplementation((email, otp, handler) => {
              const err = new GeneralError('test error');
              const info = {
                email, otp,
              };
              handler(err, info);
            }),
      };
      const controller =
        new AuthController(authService, {}, mockEmailService);
      await controller.handleGetOtp(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err.json());
    });
  });

  describe('#handleResetPassword', () => {
    it('should res.status(200) if success', async () => {
      const mockReq = {
        body: {
          otp: '123456',
          otpToken: 'string',
          newPassword: 'password',
        },
      };
      const mockRes = mock.RES;

      const mockAuthService = {
        verifyOtpToken: jest.fn().mockReturnValue(true),
        encryptPassword: jest.fn().mockReturnValue('abcdef'),
        createTokenFromUser: jest.fn().mockReturnValue('abcdef'),
      };
      const mockUserService = {
        getByEmail: jest.fn().mockReturnValue(mock.USER),
        update: jest.fn(),
      };

      const controller = new AuthController(mockAuthService, mockUserService);
      await controller.handleResetPassword(mockReq, mockRes);

      expect(mockAuthService.verifyOtpToken).toHaveBeenCalled();
      expect(mockUserService.getByEmail).toHaveBeenCalled();
      expect(mockAuthService.createTokenFromUser).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'reset password success',
        data: {accessToken: 'abcdef'},
      });
    });

    it('should res.status(400) if missing req field(s)', async () => {
      const mockReq = {
        body: {},
      };
      const mockRes = mock.RES;

      const mockAuthService = {
        verifyOtpToken: jest.fn().mockReturnValue(true),
        encryptPassword: jest.fn().mockReturnValue('abcdef'),
        createTokenFromUser: jest.fn().mockReturnValue('abcdef'),
      };
      const mockUserService = {
        getByEmail: jest.fn().mockReturnValue(mock.USER),
        update: jest.fn(),
      };

      const controller = new AuthController(mockAuthService, mockUserService);
      await controller.handleResetPassword(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(new MissingFieldError().json());
    });

    it('should res.status(401) if invalid token', async () => {
      const mockReq = {
        body: {
          otp: '123456',
          otpToken: 'string',
          newPassword: 'password',
        },
      };
      const mockRes = mock.RES;

      const mockAuthService = {
        verifyOtpToken: jest.fn().mockReturnValue(false),
        encryptPassword: jest.fn().mockReturnValue('abcdef'),
        createTokenFromUser: jest.fn().mockReturnValue('abcdef'),
      };
      const mockUserService = {
        getByEmail: jest.fn().mockReturnValue(mock.USER),
        update: jest.fn(),
      };

      const controller = new AuthController(mockAuthService, mockUserService);
      await controller.handleResetPassword(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith(
          new GeneralError('Invalid OTP or OTP Token').json());
    });

    it('should res.status(404) email not registered', async () => {
      const mockReq = {
        body: {
          otp: '123456',
          otpToken: 'string',
          newPassword: 'password',
        },
      };
      const mockRes = mock.RES;

      const mockAuthService = {
        verifyOtpToken: jest.fn().mockReturnValue(true),
        encryptPassword: jest.fn().mockReturnValue('abcdef'),
        createTokenFromUser: jest.fn().mockReturnValue('abcdef'),
      };
      const mockUserService = {
        getByEmail: jest.fn().mockReturnValue(null),
        update: jest.fn(),
      };

      const controller = new AuthController(mockAuthService, mockUserService);
      await controller.handleResetPassword(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'failed',
        message: 'email not registered',
      });
    });

    it('should res.status(500) to handle general error', async () => {
      const mockReq = {
        body: {
          otp: '123456',
          otpToken: 'string',
          newPassword: 'password',
        },
      };
      const mockRes = mock.RES;
      const err = new GeneralError('test');
      const mockAuthService = {
        verifyOtpToken: jest.fn().mockReturnValue(true),
        encryptPassword: jest.fn().mockReturnValue('abcdef'),
        createTokenFromUser: jest.fn().mockReturnValue('abcdef'),
      };
      const mockUserService = {
        getByEmail: jest.fn().mockReturnValue(mock.USER),
        update: jest.fn().mockRejectedValue(err),
      };

      const controller = new AuthController(mockAuthService, mockUserService);
      await controller.handleResetPassword(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(err.json());
    });
  });
});
