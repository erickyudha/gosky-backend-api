const express = require('express');
const swaggerUI = require('swagger-ui-express');

const swaggerDocument = require('../../docs/swagger.json');
const docsRouter = express.Router();

docsRouter.use('/docs', swaggerUI.serve);
docsRouter.get('/docs', swaggerUI.setup(swaggerDocument));

module.exports = docsRouter;
