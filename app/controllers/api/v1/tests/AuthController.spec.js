const AuthController = require('../AuthController');
const {
  JWT_SIGNATURE_KEY, EMAIL_SIGNATURE_KEY,
} = require('../../../../../config/application');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mock = require('../../../../../tests/mock');
const {MissingFieldError} = require('../../../../errors');

const generateRandomNum = () => {
  return Math.floor(Math.random() * 10 + 1);
};

describe('AuthController', () => {
  // describe('#encryptPassword', () => {
  //   it('should return valid bcrypt hashed password string', () => {
  //     const mockPass = 'amongus' + generateRandomNum();

  //     const controller = new AuthController({}, {}, bcrypt, jwt);

  //     const hashResult = controller.encryptPassword(mockPass);

  //     expect(bcrypt.compareSync(mockPass, hashResult)).toEqual(true);
  //   });
  // });

  // describe('#verifyPassword', () => {
  //   it('should return true if hash and pass match.', () => {
  //     const mockPass = 'amongus' + generateRandomNum();
  //     const mockHass = bcrypt.hashSync(mockPass, 10);

  //     const controller = new AuthController({}, {}, bcrypt, jwt);

  //     const result = controller.verifyPassword(mockPass, mockHass);
  //     expect(result).toEqual(true);
  //   });

  //   it('should return false if hash and pass not match.', () => {
  //     const mockPass = 'amongus' + generateRandomNum();
  //     const mockHass = bcrypt.hashSync(mockPass + 'sus', 10);

  //     const controller = new AuthController({}, {}, bcrypt, jwt);

  //     const result = controller.verifyPassword(mockPass, mockHass);
  //     expect(result).toEqual(false);
  //   });
  // });

  // describe('#createTokenFromUser', () => {
  //   it('should return valid jwt token based on user and role.', () => {
  //     const controller = new AuthController({}, {}, bcrypt, jwt);
  //     const mockUser = {...mock.USER};

  //     const token = controller.createTokenFromUser(mockUser);
  //     const expectedToken = jwt.sign(mockUser, JWT_SIGNATURE_KEY);

  //     expect(token).toEqual(expectedToken);
  //   });
  // });

  // describe('#decodeUserToken', () => {
  //   it('should return user data from given valid jwt token.', () => {
  //     const mockUser = {...mock.USER};
  //     const mockToken = jwt.sign(mockUser, JWT_SIGNATURE_KEY);

  //     const controller = new AuthController({}, {}, bcrypt, jwt);

  //     const decodeResult = controller.decodeUserToken(mockToken);

  //     expect(decodeResult).toMatchObject(mockUser);
  //   });
  // });

  // describe('#createOtpToken', () => {
  //   it('should return valid otpToken on return', () => {
  //     const mockEmail = 'among@us.com';

  //     const controller = new AuthController({}, {}, bcrypt, jwt);
  //     const otpToken = controller.createOtpToken(mockEmail);

  //     const decoded = jwt.verify(otpToken, EMAIL_SIGNATURE_KEY);
  //     expect(decoded.email).toEqual(mockEmail);
  //   });
  // });

  // describe('#verifyOtpToken', () => {
  //   it('should return decoded email on valid otp and token', () => {
  //     const email = 'among@us.com';
  //     const otp = '' + Math.floor(100000 + Math.random() * 900000);
  //     const token = jwt.sign({
  //       otp, email,
  //     }, EMAIL_SIGNATURE_KEY);

  //     const controller = new AuthController({}, {}, bcrypt, jwt);
  //     const result = controller.verifyOtpToken(otp, token);

  //     expect(result).toEqual(email);
  //   });

  //   it('should return null on invalid otp or token', () => {
  //     const email = 'among@us.com';
  //     const otp = '' + Math.floor(100000 + Math.random() * 900000);
  //     const token = jwt.sign({
  //       otp, email,
  //     }, EMAIL_SIGNATURE_KEY);

  //     const controller = new AuthController({}, {}, bcrypt, jwt);
  //     const result = controller.verifyOtpToken('000000', token);

  //     expect(result).toEqual(null);
  //   });
  // });

  describe('#handleGetOtp', () => {
    it('should res.status(200) on request otp success', async () => {
      const mockUser = {...mock.USER};
      const mockReq = {
        query: {
          email: mockUser.email,
        },
      };
      const mockRes = {...mock.RES};

      // Check if email already registered return null
      const mockuserService = {
        get: jest.fn().mockReturnValue(null),
      };

      const mockEmailService = {
        sendOtpEmail: jest.fn().mockReturnThis(),
      };

      const controller = new AuthController(
          mockuserService, mockEmailService,
          bcrypt, jwt,
      );
      await controller.handleGetOtp(mockReq, mockRes);

      expect(mockuserService.get).toHaveBeenCalled();
      expect(mockEmailService.sendOtpEmail).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });

    it('should res.status(400) on missing req field(s)', async () => {
      const mockReq = {
        query: {},
      };
      const mockRes = {...mock.RES};

      const controller = new AuthController(
          {}, {},
          bcrypt, jwt,
      );
      await controller.handleGetOtp(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(new MissingFieldError().json());
    });

    it('should res.status(409) if email already registered', async () => {
      const mockUser = {...mock.USER};
      const mockReq = {
        query: {
          email: mockUser.email,
        },
      };
      const mockRes = {...mock.RES};

      // email already registered
      const mockuserService = {
        get: jest.fn().mockReturnValue(mockUser),
      };

      const controller = new AuthController(
          mockuserService, {},
          bcrypt, jwt,
      );
      await controller.handleGetOtp(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(409);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'failed',
        message: 'email already registered',
      });
    });
  });

  describe('#handleGetSelf', () => {
    it('should res.status(200) and return user data if success', async () => {
      const mockUser = {...mock.USER};
      const mockToken = jwt.sign(mockUser, JWT_SIGNATURE_KEY);
      const mockReq = {
        headers: {
          authorization: 'Bearer ' + mockToken,
        },
      };
      const mockRes = {...mock.RES};

      const controller = new AuthController({}, {}, bcrypt, jwt);
      await controller.handleGetSelf(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'get user data success',
        data: mockUser,
      });
    });
  });

  describe('#handleRegister', () => {
    it('should res.status(201) on success', async () => {
      const mockUser = {...mock.USER};
      const otp = '' + Math.floor(100000 + Math.random() * 900000);
      const token = jwt.sign({
        otp, email: mockUser.email,
      }, EMAIL_SIGNATURE_KEY);
      const mockReq = {
        body: {
          name: mockUser.name,
          password: mockUser.password,
          otp,
          token,
        },
      };
      const mockRes = {...mock.RES};

      const mockUserService = {
        get: jest.fn().mockReturnValue(null),
        create: jest.fn().mockReturnValue(mockUser),
      };

      const controller = new AuthController(mockUserService, {}, bcrypt, jwt);
      controller.handleRegister(mockReq, mockRes);

      expect(mockUserService.get).toHaveBeenCalled();
      expect(mockUserService.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    it('should res.status(400) on missing req field(s)', async () => {
      const mockReq = {
        body: {},
      };
      const mockRes = {...mock.RES};

      const controller = new AuthController({}, {}, bcrypt, jwt);
      controller.handleRegister(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(new MissingFieldError().json());
    });
  });

  describe('#handleLogin', () => {
    it('should ', async () => {

    });
  });

  // describe('#handleRegister', () => {
  //   it('should res.status(201) when register success', async () => {
  //     const mockRes = { ...mock.RES };
  //     const mockReq = {

  //     }
  //   });
  // });

  // describe('#handleUpdateUser', () => {
  //   it('should res.status(200) on success', async () => {
  //     const mockUser = {...mock.USER};
  //     const mockReq = {
  //       body: {
  //         name: mockUser.name,
  //         phone: mockUser.phone,
  //         address: mockUser.address,
  //         imageId: mockUser.imageId,
  //         imageUrl: mockUser.imageUrl,
  //       },
  //     };
  //     const mockRes = { ...mockRes };

  //     const mockuserService = {
  //       get: jest.fn().mockReturnValue(mockUser),
  //       update: jest.fn().mockReturnValue(mockUser),
  //     };

  //     const controller = new AuthController({}, {}, bcrypt, jwt);

  //   });
  // });
});
