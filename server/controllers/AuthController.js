/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jest/require-hook */
const crypto = require('crypto');
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AuthController {
  static async isHealth(req, res) {
    const dbStatus = await dbClient.isAlive();
    const redisStatus = await redisClient.isAlive();
    if (!dbStatus) {
      return res.status(500).json({ error: 'Database connection failed' });
    }
    if (!redisStatus) {
      return res.status(500).json({ error: 'Redis connection failed' });
    }
    const portal = req.originalUrl.split('/')[3];
    return res.status(200).json({
      portal,
      message: 'Server is up and running',
      redisStatus,
      dbStatus,
    });
  }

  static async generateJWTSecret() {
    const jwtSecret = crypto.randomBytes(64).toString('hex');
    return jwtSecret;
  }

  static async signInPrecheck(req) {
    // check authorization header
    if (!req.headers.authorization) {
      return { error: 'Basic Authorization header is required' };
    }
    // check if Authorization header starts with Basic + space
    if (!req.headers.authorization.startsWith('Basic ')) {
      return { error: 'Authorization Header encryption improperly formatted' };
    }
    // get the token
    const data64 = req.headers.authorization.split(' ')[1];
    if (!data64) {
      return { error: 'Encrypted base64 information not found' };
    }
    return data64;
  }

  static async singinDecrypt(data64) {
    // decode the token to get the email and password
    const dataDecode = (Buffer.from(data64, 'base64').toString().split(':'));
    if (dataDecode.length !== 2) {
      return ({ error: 'Inconsistent Encryption Algorithm, ensure Base64 encryption' });
    }
    const email = dataDecode[0];
    const password = dataDecode[1];
    return { email, password };
  }
}

module.exports = AuthController;

// setTimeout(async () => {
//   const xwt = await AuthController.generateJWTSecret();
//   console.log(xwt);
// }, 5000);
