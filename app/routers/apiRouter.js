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
  notificationService,
  wishlistService,
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
apiRouter.put('/auth/password', authController.handleResetPassword);

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
apiRouter.put('/users/password',
    authController.authorizeUser,
    userController.handleUpdateUserPassword);

// TICKET ENDPOINTS
const ticketController = new controller.api.v1.TicketController(
    ticketService, wishlistService,
);
apiRouter.get('/tickets',
    authController.authorizeOptional,
    ticketController.handleGetList);
apiRouter.post('/tickets',
    authController.authorizeAdmin,
    ticketController.handleCreate);
apiRouter.get('/tickets/:id',
    authController.authorizeOptional,
    ticketController.handleGet);
apiRouter.put('/tickets/:id',
    authController.authorizeAdmin,
    ticketController.handleUpdate);
apiRouter.delete('/tickets/:id',
    authController.authorizeAdmin,
    ticketController.handleDelete);
// WISHLIST
const wishlistController =
    new controller.api.v1.WishlistController(wishlistService, ticketService);
apiRouter.get('/wishlist',
    authController.authorizeUser,
    wishlistController.handleGetList);
apiRouter.post('/tickets/:id/wishlist',
    authController.authorizeUser,
    wishlistController.handleCreate);
apiRouter.delete('/tickets/:id/wishlist',
    authController.authorizeUser,
    wishlistController.handleDelete);

// TRANSACTION ENDPOINTS
const transactionController = new controller.api.v1.TransactionController(
    transactionService, ticketService,
    notificationService, emailService,
);
apiRouter.get('/transactions',
    authController.authorizeUser,
    transactionController.handleGetList);
apiRouter.post('/transactions',
    authController.authorizeUser,
    transactionController.handleCreate);
apiRouter.get('/transactions/:id',
    authController.authorizeUser,
    transactionController.handleGet);

// IMAGE ENDPOINTS
const imageController = new controller.api.v1.ImageController(imageService);
apiRouter.post('/images',
    authController.authorizeUser,
    upload.single('image'),
    imageController.handleUpload);
apiRouter.delete('/images',
    authController.authorizeUser,
    imageController.handleDelete);

// NOTIFICATION ENDPOINTS
const notificationController = new controller.api.v1.NotificationController(
    notificationService,
);
apiRouter.get('/notifications',
    authController.authorizeUser,
    notificationController.handleList);
apiRouter.put('/notifications/:id/read',
    authController.authorizeUser,
    notificationController.handleMarkAsRead);

module.exports = apiRouter;
