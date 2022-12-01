const docsRouter = require('./docsRouter');
const apiRouter = require('./apiRouter');
const testRouter = require('./testRouter');

function apply(app) {
  app.use('', docsRouter);
  app.use('/api', apiRouter);
  app.use('/test', testRouter);

  const generalErrorHandler = (err, req, res, next) => {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  };
  app.use(generalErrorHandler);

  return app;
};

module.exports = {apply};
