const express = require('express');
const controller = require('../controllers');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const {
  ticketService,
} = require('../services');

const apiRouter = express.Router();

// AUTH ENDPOINTS
// const authController = new controller.api.v1.AuthController({
//   User, bcrypt, jwt,
// });

// USER ENDPOINTS
// TICKET ENDPOINTS
const ticketController = new controller.api.v1.TicketController(
    ticketService,
);
apiRouter.get('/tickets', ticketController.handleGetList);
apiRouter.post('/tickets', ticketController.handleCreate);
apiRouter.get('/tickets/:id', ticketController.handleGet);
apiRouter.put('/tickets/:id', ticketController.handleUpdate);
apiRouter.delete('/tickets/:id', ticketController.handleDelete);

// TRANSACTION ENDPOINTS
// IMAGE ENDPOINTS

module.exports = apiRouter;
