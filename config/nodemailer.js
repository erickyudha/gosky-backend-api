const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

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

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve('./app/views'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./app/views'),
};
transporter.use('compile', hbs(handlebarOptions));

module.exports = transporter;
