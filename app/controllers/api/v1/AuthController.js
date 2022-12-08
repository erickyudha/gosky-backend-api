const {
  GeneralError,
  MissingFieldError,
} = require('../../../errors');
const {
  UnauthorizedError,
} = require('../../../errors');


class AuthController {
  constructor(authService, userService, emailService) {
    this.authService = authService;
    this.userService = userService;
    this.emailService = emailService;
  };

  baseAuthorize = async (req, res, next, role) => {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split('Bearer ')[1];
      const decodedUser = this.authService.decodeUserToken(token);
      const user = await this.userService.get(decodedUser.id);
      if (!role.includes(user.role)) {
        res.status(401).json(new UnauthorizedError().json());
        return;
      }
      req.user = user;
      next();
    } catch (err) {
      const error = new GeneralError('invalid bearer token');
      res.status(500).json(error.json());
      return;
    }
  };

  authorizeUser = (req, res, next) => {
    this.baseAuthorize(req, res, next, ['USER', 'ADMIN']);
  };


  authorizeAdmin = (req, res, next) => {
    this.baseAuthorize(req, res, next, ['ADMIN']);
  };


  handleRegister = async (req, res) => {
    try {
      if (
        !req.body.name ||
        !req.body.password ||
        !req.body.otp ||
        !req.body.otpToken
      ) {
        const error = new MissingFieldError();
        res.status(400).json(error.json());
      } else {
        const email = this.authService.verifyOtpToken(
            req.body.otp, req.body.otpToken,
        );
        if (!email) {
          const error = new GeneralError('Invalid OTP or OTP Token');
          res.status(422).json(error.json());
          return;
        } else {
          const userExist = await this.userService.getByEmail(email);
          if (userExist) {
            res.status(409).json({
              status: 'failed',
              message: 'email already registered',
            });
          } else {
            const encryptPassword = await this.authService.encryptPassword(
                req.body.password);
            const user = await this.userService.create({
              name: req.body.name,
              encryptedPassword: encryptPassword,
              email,
              role: 'USER',
            });
            const accessToken =
              this.authService.createTokenFromUser(user.dataValues);
            res.status(201).json({
              status: 'success',
              message: 'register success',
              data:
                {accessToken},
            });
          }
        }
      };
    } catch (err) {
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
      return;
    }
  };

  handleLogin = async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        const error = new MissingFieldError();
        res.status(400).json(error.json());
      } else {
        const email = req.body.email;
        const password = req.body.password;
        const user = await this.userService.getByEmail(email);

        if (!user) {
          res.status(404).json({
            status: 'failed',
            message: 'Email is not registered',
          });
          return;
        }
        const isPasswordCorrect = this.authService.verifyPassword(
            password, user.encryptedPassword);

        if (!isPasswordCorrect) {
          res.status(401).json({
            status: 'failed',
            message: 'Wrong password',
          });
          return;
        }

        const accessToken =
          this.authService.createTokenFromUser(user.dataValues);
        res.status(200).json({
          status: 'success',
          message: 'login success',
          data:
              {accessToken: accessToken},
        });
      };
    } catch (err) {
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
      return;
    }
  };

  handleGetSelf = async (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'get user data success',
      data: req.user,
    });
  };

  handleGetOtp = async (req, res) => {
    try {
      const email = req.query.email;
      if (!email) {
        const error = new MissingFieldError();
        res.status(400).json(error.json());
        return;
      }
      const gmailAlreadyRegistered = await this.userService.getByEmail(email);
      if (gmailAlreadyRegistered) {
        res.status(409).json({
          status: 'failed',
          message: 'email already registered',
        });
        return;
      }
      // TODO: MAKE EMAIL NOT LIMITED TO GMAIL
      const valid = email.indexOf('@gmail.com');
      if (valid >= 0) {
        const [otp, otpToken] = this.authService.createOtpToken(email);
        this.emailService.sendOtpEmail(email, otp,
            (err, info) => {
              if (err) {
                throw err;
              } else {
                res.status(200).json({
                  'status': 'success',
                  'message': 'otp request success',
                  'data': {otpToken},
                });
              }
            },
        );
      } else {
        res.status(422).json({
          status: 'failed',
          message: 'wrong email format',
        });
      }
    } catch (err) {
      const error = new GeneralError(err.message);
      res.status(500).json(error.json());
      return;
    }
  };
};

module.exports = AuthController;
