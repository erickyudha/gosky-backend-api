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

  sendTransactionEmail(email, transactionData, ticketData, handler) {
    const mailOptions = {
      to: email,
      subject: 'GoSky - Transaction Receipt',
      template: 'transaction',
      context: {
        id: transactionData.id,
        amount: transactionData.amount,
        bookingCode: transactionData.bookingCode,
        createdAt: new Date(transactionData.createdAt).toLocaleString(),
        ticketName:
          `[${ticketData.category}] ${ticketData.from} - ${ticketData.to}`,
        ticketDate: new Date(ticketData.departureTime).toLocaleString(),
      },
    };

    return this.sendEmail(mailOptions, handler);
  },
};
