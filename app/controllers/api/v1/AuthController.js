class AuthController {
  constructor({
    userModel,
    bcrypt,
    jwt,
  }) {
    this.userModel = userModel;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }

  authorize = (role) => {
    return (req, res, next) > {

    };
  };

  handleRegister = async (req, res) => {

  };

  handleLogin = async (req, res) => {

  };
}

module.exports = AuthController;
