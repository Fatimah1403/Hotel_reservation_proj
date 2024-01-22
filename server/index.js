/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jest/require-hook */
/* eslint-disable no-unused-vars */
const express = require('express');
const logger = require('morgan');
const router = require('./routes/router');
const redisClient = require('./utils/redis');
const dbClient = require('./utils/db');
require('dotenv').config();

const app = express();
const port = process.env.EXPRESS_PORT;
// establishing DB connection

// middleware
app.use(express.json());

// routes
app.use(router);
app.use(logger('dev'));

// Error handling
app.use((err, _req, res, _next) => {
  const errorStatus = err.status || 500;
  const errorMsg = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMsg,
    stack: err.stack,
  });
});

async function connectDB() {
  const redisStatus = await redisClient.isAlive();
  if (!redisStatus) {
    console.error('Failed to initialize Redis');
    process.exit(1);
  }
  try {
    // ensure DB Conn is ready
    if (await dbClient.isAlive()) {
      console.log('Database connection established successfully!');
    } else {
      console.error('Database connection failed!');
      process.exit(1);
    }
  } catch (error) {
    console.error('Failed to initialize the database:', error);
    process.exit(1);
  }
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
}

connectDB();