const express = require('express');
const controller = require('../controllers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  User,
  Ticket,
  Transaction
} = require('../models');

const apiRouter = express.Router();

// AUTH ENDPOINTS
const authController = new controller.api.v1.AuthController({
  User, bcrypt, jwt,
});
apiRouter.post('/auth/register', authController.handleRegister);
apiRouter.post('/auth/login', authController.handleLogin);
apiRouter.get('/auth/whoami',
  authController.authorizeUser,
  authController.getUser
);

// USER ENDPOINTS
// TICKET ENDPOINTS
// TRANSACTION ENDPOINTS
// IMAGE ENDPOINTS

module.exports = apiRouter;