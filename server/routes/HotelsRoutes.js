/* eslint-disable jest/require-hook */
const express = require('express');

const cors = require('cors');

const hotelController = require('../controllers/HotelController');

const corsOptions = {
  origin: '*', // allow all origins for now
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Auth-Token', 'Authorization', 'X-Token'],
};

const hotelRouter = express.Router();

hotelRouter.use(cors(corsOptions));

hotelRouter.get('/', hotelController.getAllHotels);

module.exports = hotelRouter;
