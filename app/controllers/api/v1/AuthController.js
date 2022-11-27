const {JWT_SIGNATURE_KEY, SALT} = require('../../../../config/application');
const {
  UnauthorizedError,
} = require('../../../errors');


/**
   * Base authorize middleware model
   * @param {*} req - Express req instance
   * @param {*} res - Express res instance
   * @param {Function} next - Next function
   * @param {Array} role - Allowed roles to authorize
   * @return {Function} Role spesific authorize function
   */
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

/** Class representing an auth endpoint controller.*/
class AuthController {
  /**
   * Create an authentication controller
   * @param {Module} userService
   * @param {Module} bcrypt
   * @param {Module} jwt
   */
  constructor(userService, bcrypt, jwt) {
    this.userService = userService;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }

  /**
   * Authorize middleware for user and admin level role
   * @param {*} req - Express req instance
   * @param {*} res - Express res instance
   * @param {Function} next - Next function
   */
  authorizeUser = (req, res, next) => {
    baseAuthorize(req, res, next, ['USER', 'ADMIN']);
  };


  /**
   * Authorize middleware for admin level role
   * @param {*} req - Express req instance
   * @param {*} res - Express res instance
   * @param {Function} next - Next function
   */
  authorizeAdmin = (req, res, next) => {
    baseAuthorize(req, res, next, ['ADMIN']);
  };


  /**
   * Handle register endpoint
   * @param {*} req - Express req instance
   * @param {*} res - Express res instance
   */
  handleRegister = async (req, res) => {

  };


  /**
   * Handle login endpoint
   * @param {*} req - Express req instance
   * @param {*} res - Express res instance
   */
  handleLogin = async (req, res) => {

  };

  /**
   * Handle whoami endpoint
   * @param {*} req - Express req instance
   * @param {*} res - Express res instance
   */
  getUser = async (req, res) => {

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
