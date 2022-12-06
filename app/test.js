const {emailService} = require('../app/services');

module.exports = {
  get(req, res) {
    try {
      emailService.sendOtpEmail('erickyudhaps@gmail.com', 'uwo0',
          (err, info) => {
            if (err) {
              throw new Error();
            } else {
              res.status(200).json({
                info: info,
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
