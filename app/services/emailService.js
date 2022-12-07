const transporter = require('../../config/nodemailer');

module.exports = {
  sendEmail(mailOptions, handler) {
    transporter.sendMail(mailOptions, handler);
  },

  sendOtpEmail(email, otp, handler) {
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

  sendTransactionEmail(email, transactionData, handler) {
    const mailOptions = {
      to: email,
      subject: 'GoSky - Transaction Receipt',
      template: 'transaction',
      context: transactionData,
    };

    return this.sendEmail(mailOptions, handler);
  },
};
