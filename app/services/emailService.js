const transporter = require('../../config/nodemailer');

module.exports = {
  sendEmail(mailOptions) {
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      return info;
    });
  },

  sendOtpEmail(email, otp) {
    const mailOptions = {
      to: email,
      subject: 'GoSky - Email Confirmation',
      template: 'otp',
      context: {
        otp: otp,
      },
    };

    return this.sendEmail(mailOptions);
  },
};
