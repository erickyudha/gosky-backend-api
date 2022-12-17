require('dotenv').config();

const {
  MORGAN_FORMAT = 'dev',
  JWT_SIGNATURE_KEY = 'AMOGUS',
  EMAIL_SIGNATURE_KEY = 'IMPOSTOR',
  SALT = 10,
} = process.env;

module.exports = {
  MORGAN_FORMAT,
  JWT_SIGNATURE_KEY,
  EMAIL_SIGNATURE_KEY,
  SALT: parseInt(SALT),
};
