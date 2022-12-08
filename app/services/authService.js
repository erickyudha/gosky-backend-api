const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {EMAIL_SIGNATURE_KEY, JWT_SIGNATURE_KEY, SALT} =
  require('../../config/application');

module.exports = {
  createOtpToken(email) {
    const otp = '' + Math.floor(100000 + Math.random() * 900000);
    const token = jwt.sign({
      otp, email,
    }, EMAIL_SIGNATURE_KEY);
    return [otp, token];
  },

  verifyOtpToken(otp, otpToken) {
    const decoded = jwt.verify(otpToken, EMAIL_SIGNATURE_KEY);
    if (otp == decoded.otp) return decoded.email;
    else return null;
  },

  createTokenFromUser(user) {
    return jwt.sign(user, JWT_SIGNATURE_KEY);
  },

  decodeUserToken(token) {
    return jwt.verify(token, JWT_SIGNATURE_KEY);
  },

  encryptPassword(password) {
    return bcrypt.hashSync(password, SALT);
  },

  verifyPassword(password, encryptedPassword) {
    return bcrypt.compareSync(password, encryptedPassword);
  },
};
