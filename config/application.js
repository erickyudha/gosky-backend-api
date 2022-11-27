module.exports = {
  MORGAN_FORMAT:
    ':method :url :status :res[content-length] - :response-time ms',
  JWT_SIGNATURE_KEY: process.env.JWT_SIGNATURE_KEY || 'Rahasia',
  EMAIL_SIGNATURE_KEY: process.env.JWT_SIGNATURE_KEY || 'Rahasia2',
  SALT: process.env.SALT || 10,
};
