const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// const {
//   ApplicationController,
//   AuthenticationController,
//   CarController,
// } = require('./controllers');

// const {
//   User,
//   Role,
//   Car,
//   UserCar,
// } = require('./models');

function apply(app) {
  return app;
};

module.exports = {apply};
