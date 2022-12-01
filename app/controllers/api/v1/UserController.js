class UserController {
  constructor(userService, authService) {
    this.userService = userService;
    this.authService = authService;
  }

  handleGetSimpleUser = (req, res) => {
    // TODO:
    // GET SIMPLE USER DATA BY USER ID
    // id get from req.params
    // Check response example from swagger docs
  };

  handleUpdateUser = (req, res) => {
    // TODO:
    // Finish authorization handler first
    // UPDATE USER DATA BY THAT USER THEMSELF
    // USER DATA GET FROM req.user
    // Check allowed field to update from swagger docs
  };

  handleUpdateUserEmail = (req, res) => {
    // TODO:
    // Finish authorization handler first
    // UPDATE USER EMAIL BY THAT USER THEMSELF
    // USER DATA GET FROM req.user
    // Email get from decoded otpToken
  };
};

module.exports = UserController;
