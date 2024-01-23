/* eslint-disable jest/require-hook */
const express = require('express');
const cors = require('cors');

const roomController = require('../controllers/RoomController');

const corsOptions = {
  origin: '*', // allow all origins for now
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Auth-Token', 'Authorization', 'X-Token'],
};

const roomRouter = express.Router();
roomRouter.use(cors(corsOptions));

roomRouter.get('/', roomController.getAllRooms);

module.exports = roomRouter;
