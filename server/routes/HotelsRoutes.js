/* eslint-disable jest/require-hook */
const express = require('express');

const hotelController = require('../controllers/HotelController');

const hotelRouter = express.Router();

hotelRouter.get('/', hotelController.getAllHotels);

module.exports = hotelRouter;