/* eslint-disable no-unused-vars */
/* eslint-disable jest/require-hook */
const express = require('express');

const authController = require('../controllers/AuthController');

const authRouter = express.Router();

// authRouter.post('/register', authController.register);
authRouter.get('/health', authController.isHealth);

module.exports = authRouter;
