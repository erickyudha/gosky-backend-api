const {
  UnauthorizedError,
} = require('../../../errors');

baseAuthorize = async (req, res, next, role) => {
  try {
    // const bearerToken = req.headers.authorization;
    // const token = bearerToken.split('Bearer ')[1];

    // TODO: VERIFY TOKEN AND CHECK USER ROLE

    // if success pass user data to req.user and go next()
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json(new UnauthorizedError().json());
  }
};
class AuthController {
  constructor(authService, userService, emailService) {
    this.authService = authService;
    this.userService = userService;
    this.emailService = emailService;
  }

  authorizeUser = (req, res, next) => {
    baseAuthorize(req, res, next, ['USER', 'ADMIN']);
  };


  authorizeAdmin = (req, res, next) => {
    baseAuthorize(req, res, next, ['ADMIN']);
  };


  handleRegister = async (req, res) => {
    // TODO:
    // Finish handleGetOtp First
    // email is in otpToken
  };

  handleLogin = async (req, res) => {
    // TODO:
    // Just regular login handler
  };

  handleGetSelf = async (req, res) => {
    // TODO:
    // Just return data from req.user
  };

  handleGetOtp = async (req, res) => {
    // TODO:
    // VERIFY email format IMPORTANT!
    // Generate otp token with authService

    // Set .env for email service
    // Send otp email with emailService
    // EXAMPLE:
    // this.emailService.sendOtpEmail('email@mail.com', 123456,
    //     (err, info) => {
    //       if (err) {
    //         throw new Error('failed to send email');
    //       } else {
    //         res.status(200).json({
    //           'status': 'success',
    //           'message': 'otp request success',
    //           'data': {
    //             'otpToken': CHANGE_THIS,
    //           },
    //         });
    //       }
    //     },
    // );
  };
};

module.exports = AuthController;
