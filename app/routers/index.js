const docsRouter = require('./docsRouter');
// const apiRouter = require('./apiRouter');
const testRouter = require('./testRouter');

function apply(app) {
  app.use('', docsRouter);
  // app.use('/api', apiRouter);
  app.use('/test', testRouter);

  return app;
};

module.exports = {apply};
