const docsRouter = require('./docsRouter');
const apiRouter = require('./apiRouter');

function apply(app) {
  app.use('', docsRouter);
  // app.use('/api', apiRouter);

  return app;
};

module.exports = {apply};
