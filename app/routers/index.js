const docsRouter = require('./docsRouter');
const apiRouter = require('./apiRouter');
const path = require('path');
const express = require('express');

function apply(app) {
  app.use('', docsRouter);
  app.use('/api', apiRouter);
  app.use('/static', express.static(path.join(__dirname, '../../public')));

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
