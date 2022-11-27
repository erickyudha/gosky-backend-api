const nodemailer = require('nodemailer');

const {
  EMAIL_SERVICE = 'gmail',
  EMAIL_USER = 'youremail@gmail.com',
  EMAIL_PASS = 'yourpassword',
} = process.env;

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

module.exports = transporter;
