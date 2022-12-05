const services = require('../../../services');
const {
  GeneralError,
  MissingFieldError,
} = require('../../../errors');
const {
  UnauthorizedError,
} = require('../../../errors');

baseAuthorize = async (req, res, next, role) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split('Bearer ')[1];
    // TODO: VERIFY TOKEN AND CHECK USER ROLE
    const payload = services.authService.decodeUserToken(token);
    // if success pass user data to req.user and go next()
    const user = await services.userService.getByEmail(payload);
    if (!role.includes(user.role)) {
      res.status(401).json(new UnauthorizedError().json());
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    const error = new GeneralError(err);
    res.status(500).json(error.json());
    return;
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
    try {
      this.authService.verifyOtpToken(req.body.otp, req.body.otpToken);
      if (
        !req.body.name ||
        !req.body.encryptedPassword ||
        !req.body.otp ||
        !req.body.otpToken
      ) {
        const error = new MissingFieldError();
        res.status(400).json(error.json());
      } else {
        const verify = this.authService.verifyOtpToken(
            req.body.otp, req.body.otpToken,
        );
        if (!verify) {
          const error = new GeneralError();
          res.status(500).json(error.json());
          return;
        } else {
          const encryptPassword = await this.authService.encryptPassword(
              req.body.encryptedPassword);
          await this.userService.create({
            email: req.query.email,
            ...req.body,
            encryptedPassword: encryptPassword,
            role: 'USER',
          });
          const accessToken = this.authService.createTokenFromUser(verify);
          res.status(201).json({
            status: 'success',
            message: 'register success',
            data:
              {accessToken: accessToken},
          });
        }
      };
    } catch (err) {
      const error = new GeneralError(err);
      res.status(500).json(error.json());
      return;
    }
  };

  handleLogin = async (req, res) => {
    try {
      if (!req.body.email || !req.body.encryptedPassword) {
        const error = new MissingFieldError();
        res.status(400).json(error.json());
      } else {
        const email = req.body.email;
        const password = req.body.encryptedPassword;
        const user = await this.userService.getByEmail(email);

        if (!user) {
          res.status(401).json({
            status: 'failed',
            message: 'Email is not registered',
          });
          return;
        }
        console.log(user.encryptedPassword);
        const isPasswordCorrect = this.authService.verifyPassword(
            password, user.encryptedPassword);

        if (!isPasswordCorrect) {
          res.status(401).json({
            status: 'failed',
            message: 'Wrong password',
          });
          return;
        }

        const accessToken = this.authService.createTokenFromUser(email);
        res.status(200).json({
          status: 'success',
          message: 'login success',
          data:
              {accessToken: accessToken},
        });
      };
    } catch (err) {
      const error = new GeneralError(err);
      res.status(500).json(error.json());
      return;
    }
  };

  handleGetSelf = async (req, res) => {
    // TODO:
    // Just return data from req.user
    res.status(200).json({
      status: 'success',
      message: 'get user data success',
      data: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        encryptedPassword: req.user.encryptedPassword,
        role: req.user.role,
        phone: req.user.phone,
        address: req.user.address,
        imageId: req.user.imageId,
        imageUrl: req.user.imageUrl,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
        deletedAt: req.user.deletedAt,
      },
    });
  };

  handleGetOtp = async (req, res) => {
    try {// TODO:
      // VERIFY email format IMPORTANT!
      // Generate otp token with authService
      const email = req.query.email;
      const gmailAlreadyRegistered = await this.userService.getByEmail(email);
      if (gmailAlreadyRegistered) {
        res.status(409).json({
          status: 'failed',
          message: 'email already registered',
        });
        return;
      }
      if (!email) {
        const error = new MissingFieldError();
        res.status(400).json(error.json());
        return;
      }
      const valid = email.indexOf('@gmail.com');
      if (valid >= 0) {
        const createOtpTokenEmail = this.authService.createOtpToken(email);
        const otp = this.authService.decodeUserToken(createOtpTokenEmail);
        // Set .env for email service
        // Send otp email with emailService
        // EXAMPLE:
        this.emailService.sendOtpEmail(email, otp.otp,
            (err, info) => {
              if (err) {
                throw err;
              } else {
                res.status(200).json({
                  'status': 'success',
                  'message': 'otp request success',
                  'data': {
                    'otpToken': createOtpTokenEmail,
                  },
                });
              }
            },
        );
      } else {
        res.status(500).json({
          message: 'wrong Gmail format',
        });
      }
    } catch (err) {
      const error = new GeneralError();
      res.status(500).json(error.json());
      return;
    }
  };
};

module.exports = AuthController;
