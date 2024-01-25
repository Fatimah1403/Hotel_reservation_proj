/* eslint-disable import/no-unresolved */
/* eslint-disable jest/require-hook */
const express = require('express');

const userController = require('../controllers/UsersController');
const imageController = require('../controllers/ImageController');

const userRouter = express.Router();

userRouter.get('/health', userController.isHealth);
// userRouter.post('/createuser', userController.createUser);
userRouter.get('/all', userController.getAllUsers);
userRouter.post('/signup', userController.signUp);
userRouter.post('/login', userController.login);
userRouter.put('/update', userController.updateUser);
userRouter.post('/refreshjwt', userController.refreshJWT);
userRouter.get('/logout', userController.logout);
userRouter.post('/resetpassword', userController.resetPassword);
userRouter.put('/newpassword', userController.newPassword);
userRouter.put('/changepassword', userController.changePassword);
userRouter.get('/me', userController.userData);
userRouter.get('/bookings/:id', userController.bookings);
userRouter.post('/bookroom', userController.bookRoom);
userRouter.patch('/updatebooking/:id', userController.updateBooking);
userRouter.delete('/deletebooking/:id', userController.deleteBooking);
userRouter.get('/signature', imageController.getSignature);
userRouter.post('/uploadimage', imageController.uploadNewImage);
userRouter.get('/me', userController.userData);

// userRouter.patch('/profile', userController.updateProfile);

// userRouter.delete('/profile', userController.deleteProfile);

// userRouter.patch('/password', userController.updatePassword);

// userRouter.delete('/delete', userController.deleteUser);

module.exports = userRouter;
