const AuthController = require('../AuthController');
const {JWT_SIGNATURE_KEY, SALT} = require('../../../../../config/application');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mock = require('../../../../../tests/mock');
const {IdNotFoundError} = require('../../../../errors');

const generateRandomNum = () => {
  return Math.floor(Math.random() * 10 + 1);
};

describe('AuthController', () => {
  describe('#encryptPassword', () => {
    it('should return valid bcrypt hashed password string', () => {
      const mockPass = 'amongus' + generateRandomNum();

      const controller = new AuthController({}, {}, bcrypt, jwt);

      const hashResult = controller.encryptPassword(mockPass);

      expect(bcrypt.compareSync(mockPass, hashResult)).toEqual(true);
    });
  });

  describe('#verifyPassword', () => {
    it('should return true if hash and pass match.', () => {
      const mockPass = 'amongus' + generateRandomNum();
      const mockHass = bcrypt.hashSync(mockPass, 10);

      const controller = new AuthController({}, {}, bcrypt, jwt);

      const result = controller.verifyPassword(mockPass, mockHass);
      expect(result).toEqual(true);
    });

    it('should return false if hash and pass not match.', () => {
      const mockPass = 'amongus' + generateRandomNum();
      const mockHass = bcrypt.hashSync(mockPass + 'sus', 10);

      const controller = new AuthController({}, {}, bcrypt, jwt);

      const result = controller.verifyPassword(mockPass, mockHass);
      expect(result).toEqual(false);
    });
  });

  describe('#createTokenFromUser', () => {
    it('should return valid jwt token based on user and role.', () => {
      const controller = new AuthController({}, {}, bcrypt, jwt);
      const mockUser = {...mock.USER};

      const token = controller.createTokenFromUser(mockUser);
      const expectedToken = jwt.sign(mockUser, JWT_SIGNATURE_KEY);

      expect(token).toEqual(expectedToken);
    });
  });

  describe('#decodeUserToken', () => {
    it('should return user data from given valid jwt token.', () => {
      const mockUser = {...mock.USER};
      const mockToken = jwt.sign(mockUser, JWT_SIGNATURE_KEY);

      const controller = new AuthController({}, {}, bcrypt, jwt);

      const decodeResult = controller.decodeUserToken(mockToken);

      expect(decodeResult).toMatchObject(mockUser);
    });
  });

  describe('#handleGetUser', () => {
    it('should res.status(200) and return simple user data', async () => {
      const mockReq = {
        params: {
          id: 1,
        },
      };
      const mockRes = {...mock.RES};
      const mockUser = {...mock.USER};
      const mockUserService = {
        get: jest.fn().mockReturnValue(mockUser),
      };
      const expectedResData = {
        id: mockUser.id,
        name: mockUser.name,
        role: mockUser.role,
        imageUrl: mockUser.imageUrl,
      };

      const controller = new AuthController(mockUserService, {}, bcrypt, jwt);
      await controller.handleGetUser(mockReq, mockRes);

      expect(mockUserService.get).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'get user data success',
        data: expectedResData,
      });
    });

    it('should res.status(404) if id not found', async () => {
      const mockReq = {
        params: {
          id: 1,
        },
      };
      const mockRes = {...mock.RES};
      const mockUserService = {
        get: jest.fn().mockReturnValue(null),
      };

      const controller = new AuthController(mockUserService, {}, bcrypt, jwt);
      await controller.handleGetUser(mockReq, mockRes);

      expect(mockUserService.get).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(new IdNotFoundError().json());
    });
  });

  describe('#handleRegister', () => {
    it('should res.status(201)', async () => {

    });
  });

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
