const express = require('express');
const controller = require('../controllers');

const {
  ticketService,
  authService,
  emailService,
  userService,
} = require('../services');

const apiRouter = express.Router();

// AUTH ENDPOINTS
const authController =
  new controller.api.v1.AuthController(authService, userService, emailService);
apiRouter.post('/auth/register', authController.handleRegister);
apiRouter.post('/auth/login', authController.handleLogin);
apiRouter.get('/auth/whoami',
    authController.authorizeUser,
    authController.handleGetSelf,
);
apiRouter.get('/auth/otp', authController.handleGetOtp);

// USER ENDPOINTS
const userController = new controller.api.v1.UserController(
    userService, authService,
);
apiRouter.get('/users/:id', userController.handleGetSimpleUser);
apiRouter.put('/users',
    authController.authorizeUser,
    userController.handleUpdateUser);
apiRouter.put('/users/email',
    authController.authorizeUser,
    userController.handleUpdateUserEmail);

// TICKET ENDPOINTS
const ticketController = new controller.api.v1.TicketController(
    ticketService,
);
apiRouter.get('/tickets', ticketController.handleGetList);
apiRouter.post('/tickets',
    authController.authorizeAdmin,
    ticketController.handleCreate);
apiRouter.get('/tickets/:id', ticketController.handleGet);
apiRouter.put('/tickets/:id',
    authController.authorizeAdmin,
    ticketController.handleUpdate);
apiRouter.delete('/tickets/:id',
    authController.authorizeAdmin,
    ticketController.handleDelete);

// TRANSACTION ENDPOINTS
// IMAGE ENDPOINTS

module.exports = apiRouter;
