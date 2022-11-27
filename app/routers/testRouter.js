const express = require('express');
const testController = require('../test');
const testRouter = express.Router();

testRouter.get('/', testController.get);
testRouter.post('/', testController.post);
testRouter.put('/', testController.put);
testRouter.delete('/', testController.delete);

module.exports = testRouter;
