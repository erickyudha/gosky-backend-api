const transporter = require('../../config/nodemailer');

module.exports = {
  sendEmail(mailOptions, handler) {
    transporter.sendMail(mailOptions, handler);
  },

  async sendOtpEmail(email, otp, handler) {
    const mailOptions = {
      to: email,
      subject: 'GoSky - Email Confirmation',
      template: 'otp',
      context: {
        otp: otp,
      },
    };

    return this.sendEmail(mailOptions, handler);
  },
};
