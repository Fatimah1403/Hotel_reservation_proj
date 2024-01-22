/* eslint-disable import/no-unresolved */
/* eslint-disable jest/require-hook */
const express = require('express');

const userController = require('../controllers/UsersController');

const userRouter = express.Router();

userRouter.get('/health', userController.isHealth);
// userRouter.post('/createuser', userController.createUser);
userRouter.get('/all', userController.getAllUsers);
userRouter.post('/signup', userController.signUp);
userRouter.post('/login', userController.login);
userRouter.put('/update', userController.updateUser);
userRouter.post('/refreshjwt', userController.refreshJWT);
userRouter.get('/logout', userController.logout);

// userRouter.get('/verify', userController.verifyUser);

// userRouter.get('/refresh', userController.refreshToken);

// userRouter.get('/profile', userController.getProfile);

// userRouter.patch('/profile', userController.updateProfile);

// userRouter.delete('/profile', userController.deleteProfile);

// userRouter.patch('/password', userController.updatePassword);

// userRouter.delete('/delete', userController.deleteUser);

module.exports = userRouter;