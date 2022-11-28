const transporter = require('../config/nodemailer');

module.exports = {
  get(req, res) {
    try {
      const mailOptions = {
        to: 'erickyudhaps@gmail.com',
        subject: 'Omegalul',
        text: 'That was easy!',
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          throw error;
        } else {
          res.status(200).json({
            status: 'success',
            message: 'email sent',
          });
        }
      });
    } catch (error) {
      res.status(422).json({error});
    }
  },

  post(req, res) {
    console.log('====================================');
    console.log(req.query);
    console.log('====================================');
    res.status(200).end();
  },

  put(req, res) {
    res.status(200).end();
  },

  delete(req, res) {
    res.status(200).end();
  },
};
