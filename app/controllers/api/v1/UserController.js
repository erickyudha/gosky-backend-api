
const {
  GeneralError,
  IdNotFoundError,
  MissingFieldError,
} = require('../../../errors');
class UserController {
  constructor(userService, authService) {
    this.userService = userService;
    this.authService = authService;
  }

  handleGetSimpleUser = async (req, res) => {
    // TODO:
    // GET SIMPLE USER DATA BY USER ID
    // id get from req.params
    // Check response example from swagger docs
    try {
      const user = await this.userService.simpleGet(req.params.id);
      console.log(user);
      if (!user) {
        const err = new IdNotFoundError();
        res.status(404).json(err.json());
        return;
      }
      res.status(200).json({
        status: 'success',
        message: 'get user data success',
        data: user,
      });
    } catch (err) {
      const error = new GeneralError(err);
      res.status(500).json(error.json());
    }
  };

  handleUpdateUser = async (req, res) => {
    // TODO:
    // Finish authorization handler first
    // UPDATE USER DATA BY THAT USER THEMSELF
    // USER DATA GET FROM req.user
    // Check allowed field to update from swagger docs
    try {
      const user = req.user;
      if (
        !req.body.name ||
        !req.body.phone ||
        !req.body.address ||
        !req.body.imageId ||
        !req.body.imageUrl
      ) {
        const error = new MissingFieldError();
        res.status(400).json(error.json());
        return;
      }
      await this.userService.update(user.id, {
        ...req.body,
      });
      const accessToken = await this.authService.createTokenFromUser(
          user.email);
      res.status(200).json({
        status: 'success',
        message: 'update user data success',
        data: {
          accessToken: accessToken,
          userData: {
            id: req.user.id,
            name: req.body.name,
            email: req.user.email,
            encryptedPassword: req.user.encryptedPassword,
            role: req.user.role,
            phone: req.body.phone,
            address: req.body.address,
            imageId: req.body.imageId,
            imageUrl: req.body.imageUrl,
            createdAt: req.user.createdAt,
            updatedAt: req.user.updatedAt,
            deletedAt: req.user.deletedAt,
          },
        },
      });
    } catch (err) {
      const error = new GeneralError(err);
      res.status(500).json(error.json());
    }
  };

  handleUpdateUserEmail = async (req, res) => {
    // TODO:
    // Finish authorization handler first
    // UPDATE USER EMAIL BY THAT USER THEMSELF
    // USER DATA GET FROM req.user
    // Email get from decoded otpToken
    try {
      const user = req.user;
      if (
        !req.body.otp ||
        !req.body.otpToken
      ) {
        const error = new MissingFieldError();
        res.status(400).json(error.json());
        return;
      }
      const verify = this.authService.verifyOtpToken(
          req.body.otp, req.body.otpToken,
      );
      if (!verify) {
        res.status(422).json({
          status: 'failed',
          message: 'wrong otp or invalid otpToken',
        });
        return;
      }
      const otp = this.authService.decodeUserToken(req.body.otpToken);
      await this.userService.update(user.id, {
        email: otp.email,
      });
      const accessToken = await this.authService.createTokenFromUser(
          otp.email);
      res.status(200).json({
        status: 'success',
        message: 'update user email success',
        data: {
          accessToken: accessToken,
          userData: {
            id: req.user.id,
            name: req.user.name,
            email: otp.email,
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
        },
      });
    } catch (err) {
      const error = new GeneralError(err);
      res.status(500).json(error.json());
    }
  };
};

module.exports = UserController;
