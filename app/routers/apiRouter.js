const express = require('express');
const controller = require('../controllers');
const upload = require('../../config/upload');

const {
  ticketService,
  authService,
  emailService,
  userService,
  imageService,
  transactionService,
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
const transactionController = new controller.api.v1.TransactionController(
    transactionService, userService, ticketService,
);
apiRouter.get('/transactions',
    authController.authorizeUser,
    transactionController.handleGetList);
apiRouter.post('/transactions',
    authController.authorizeUser,
    transactionController.handleCreate);
apiRouter.get('/transactions/:id',
    authController.authorizeUser,
    transactionController.handleGetList);

// IMAGE ENDPOINTS
const imageController = new controller.api.v1.ImageController(imageService);
apiRouter.post('/images',
    authController.authorizeUser,
    upload.single('image'),
    imageController.handleUpload);
apiRouter.delete('/images',
    authController.authorizeUser,
    imageController.handleDelete);

module.exports = apiRouter;
