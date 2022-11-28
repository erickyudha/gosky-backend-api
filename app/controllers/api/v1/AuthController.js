const {JWT_SIGNATURE_KEY, SALT} = require('../../../../config/application');
const {
  UnauthorizedError,
} = require('../../../errors');

baseAuthorize = async (req, res, next, role) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split('Bearer ')[1];

    // TODO: VERIFY TOKEN AND CHECK USER

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json(new UnauthorizedError().json());
  }
};
class AuthController {
  constructor(userService, emailService, bcrypt, jwt) {
    this.userService = userService;
    this.emailService = emailService;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }

  authorizeUser = (req, res, next) => {
    baseAuthorize(req, res, next, ['USER', 'ADMIN']);
  };


  authorizeAdmin = (req, res, next) => {
    baseAuthorize(req, res, next, ['ADMIN']);
  };


  handleRegister = async (req, res) => {

  };

  handleLogin = async (req, res) => {

  };

  handleGetUser = async (req, res) => {

  };

  createTokenFromUser = (user) => {
    return this.jwt.sign(user, JWT_SIGNATURE_KEY);
  };

  decodeUserToken = (token) => {
    return this.jwt.verify(token, JWT_SIGNATURE_KEY);
  };

  encryptPassword = (password) => {
    return this.bcrypt.hashSync(password, SALT);
  };

  verifyPassword = (password, encryptedPassword) => {
    return this.bcrypt.compareSync(password, encryptedPassword);
  };
}

module.exports = AuthController;
