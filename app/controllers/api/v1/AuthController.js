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
   * @param {SequelizeModel} userModel - Sequelize model for Users table
   * @param {Module} bcrypt - Bcrypt module
   * @param {Module} jwt - JWT module
   */
  constructor(userModel, bcrypt, jwt) {
    this.userModel = userModel;
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
}

module.exports = AuthController;
