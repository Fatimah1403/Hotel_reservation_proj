const JWT = require('jsonwebtoken');
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');
const RefreshToken = require('../models/RefreshToken');
require('dotenv').config();

const EXP = 60 * 60 * 24; // 24hrs
// const EXP = 15; // 15s

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
const jwtAccessExp = process.env.JWT_ACCESS_EXPIRES_IN;
const jwtRefreshExp = process.env.JWT_REFRESH_EXPIRES_IN;

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

  static async currPreCheck(req) {
    if (!req.headers.authorization) {
      return ({ error: 'Bearer Authorization header is required' });
    }
    if (!req.headers.authorization.startsWith('Bearer ')) {
      return ({ error: 'Authorization Header improperly formatted' });
    }
    const jwToken = req.headers.authorization.split(' ')[1];
    if (!jwToken) {
      return ({ error: 'Missing JWT token' });
    }
    return (jwToken);
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

  static async generateJWT(obj) {
    const payload = { id: obj.id };
    const accessToken = JWT.sign(payload, jwtAccessSecret, { expiresIn: jwtAccessExp, algorithm: 'HS256' });
    const refreshToken = JWT.sign(payload, jwtRefreshSecret, { expiresIn: jwtRefreshExp, algorithm: 'HS256' });
    const refreshObj = await RefreshToken.findOne({ userId: obj.id });
    if (refreshObj) {
      console.log('removing and creating a new object');
      // remove the old refresh token object
      await RefreshToken.deleteOne({ userId: obj.id });
      await RefreshToken.create({ userId: obj.id, token: refreshToken });
    } else {
      console.log('creating');
      await RefreshToken.create({ userId: obj.id, token: refreshToken });
    }
    return { accessToken, refreshToken };
  }

  static async refreshJWT(oldRefreshToken, payload) {
    try {
      // Find the old refresh token
      const refreshTokenObj = await RefreshToken.findOne({ userId: payload.id, token: oldRefreshToken });
      // Check if the old refresh token exists
      if (!refreshTokenObj) {
        return { error: 'Invalid refresh token' };
      }
      // Generate new access and refresh token
      const accessToken = JWT.sign({ id: payload.id }, jwtAccessSecret, { expiresIn: jwtAccessExp, algorithm: 'HS256' });
      const refreshToken = JWT.sign({ id: payload.id }, jwtRefreshSecret, { expiresIn: jwtRefreshExp, algorithm: 'HS256' });
      // Update refresh token
      try {
        // remove the old refresh token object
        await RefreshToken.deleteOne({ userId: payload.id, token: oldRefreshToken });

        // create a new refresh token
        await RefreshToken.create({ userId: payload.id, token: refreshToken });
      } catch (err) {
        return { error: 'Database Internal Server Error', err };
      }
      return { accessToken, refreshToken };
    } catch (err) {
      return { error: err.message || 'Invalid refresh token' };
    }
  }

  static async verifyAccessToken(accessToken) {
    // Verify the access token
    try {
      const payload = JWT.verify(accessToken, jwtAccessSecret, { algorithm: 'HS256' });
      if (!payload || !payload.id) {
        return ({ error: 'Invalid access token' });
      }
      return (payload);
    } catch (err) {
      return ({ error: err.message || 'Invalid access token' });
    }
  }

  static async verifyRefreshToken(refreshToken) {
    // Verify the refresh token
    try {
      const payload = JWT.verify(refreshToken, jwtRefreshSecret, { algorithm: 'HS256' });
      if (!payload || !payload.id) {
        return ({ error: 'Invalid refresh token' });
      }
      return (payload);
    } catch (err) {
      return ({ error: err.message || 'Invalid refresh token' });
    }
  }

  // saving the JWT token in redis
  static async setJWT(obj, accessToken) {
    // set the JWT token
    const key = `auth_${obj.id}`;
    try {
      await redisClient.set(key, accessToken, EXP);
    } catch (RedisError) {
      console.error('Redis Error:', RedisError);
      return ({ error: RedisError });
    }
    return;
  }

  static async getJWT(id) {
    const key = `auth_${id}`;
    const redisAccessToken = await redisClient.get(key);
    if (!redisAccessToken || redisAccessToken === 'nill' || redisAccessToken === 'null') {
      return ({ error: 'Access token is expired' });
    }
    return redisAccessToken;
  }

  static async deleteJWT(id) {
    const key = `auth_${id}`;
    try {
      const result = await redisClient.del(key);
      if (result === 0) {
        return { error: 'Token does not exist' };
      }
      if (!result) {
        return { error: 'Invalid Operation', msg: 'Token does not exist' };
      }
      return result;
    } catch (RedisError) {
      console.error('Redis Error:', RedisError);
      return { error: RedisError };
    }
  }

  static async fullCurrCheck(req) {
    const accessToken = await this.currPreCheck(req);
    if (accessToken.error) {
      return { error: accessToken.error };
    }
    const payload = await this.verifyAccessToken(accessToken);
    if (payload.error) {
      return { error: payload.error };
    }
    const { id } = payload;
    if (!id) {
      return { error: 'Invalid token for associated ID' };
    }
    const redisAccessToken = await this.getJWT(payload.id);
    if (redisAccessToken.error) {
      return { error: redisAccessToken.error };
    }
    if (redisAccessToken !== accessToken) {
      return { error: 'Invalid token' };
    }
    return id;
  }
}

module.exports = AuthController;

// setTimeout(async () => {
//   const xwt = await AuthController.generateJWTSecret();
//   const { accessToken, refreshToken } = await AuthController.generateJWTToken({ id: 12 }, xwt);
//   console.log({ accessToken });
//   console.log({ refreshToken });
// }, 5000);
