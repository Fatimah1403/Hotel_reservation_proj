/* eslint-disable jest/require-hook */
const express = require('express');

const authRouter = require('./AuthRoute');
const userRouter = require('./UsersRoutes');
const hotelRouter = require('./HotelsRoutes');
const roomRouter = require('./RoomsRoutes');

const router = express.Router();
// middleware

 //  All routes
router.use('/api/v1/auth', authRouter);
router.use('/api/v1/users', userRouter);
router.use('/api/v1/hotels', hotelRouter);
router.use('/api/v1/rooms', roomRouter);

module.exports = router;
