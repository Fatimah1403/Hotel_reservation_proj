/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authClient = require('./AuthController');

const userRef = [
  'username',
  'country',
  'city',
  'phone',
  'isAdmin',
  'img',
];

class UserController {
  static async isHealth(req, res) {
    return res.status(200).json({
      success: true,
      message: 'Server is healthy',
    });
  }

  static async getAllUsers(req, res) {
    const users = await User.find();
    return res.status(200).json(users);
  }

  static async createUser(req, res) {
    const attributes = {};
    const requiredAttributes = [
      'username',
      'email',
      'country',
      'city',
      'phone',
      'password',
      'isAdmin',
      'img',
    ];
    // Check if the body of the request has the required attributes
    for (const key of requiredAttributes) {
      if (!Object.prototype.hasOwnProperty.call(req.body, key)) {
        return res.status(400).json({
          error: `Missing required attribute: ${key}`,
          genFormat: '{ username: <string>, email: <string>, country: <string>, city: <string>, ...}',
        });
      }
      attributes[key] = req.body[key];
    }
    // Check if the user already exists
    let coreCheck = await User.findOne({ email: attributes.email });
    if (coreCheck) {
      return res.status(409).json({ error: 'User email already exists' });
    }
    coreCheck = await User.findOne({ username: attributes.username });
    if (coreCheck) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    try {
      // Create a new user
      const user = await User.createUser(attributes);
      return res.status(201).json({
        msg: 'User object successfully created',
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async signUp(req, res) {
    const data64 = await authClient.signInPrecheck(req);
    if (data64.error) {
      return res.status(400).json({ error: data64.error });
    }
    const decodeData = await authClient.singinDecrypt(data64);
    if (decodeData.error) {
      return res.status(400).json({ error: decodeData.error });
    }
    const attributes = {};
    attributes.email = decodeData.email;
    attributes.password = decodeData.password;
    // Check if the body of the request has the required attributes
    for (const key of userRef) {
      if (!Object.prototype.hasOwnProperty.call(req.body, key)) {
        return res.status(400).json({
          error: `Missing required attribute: ${key}`,
          genFormat: '{ username: <string>, email: <string>, country: <string>, city: <string>, ...}',
        });
      }
      attributes[key] = req.body[key];
    }
    let coreCheck = await User.findOne({ email: attributes.email });
    if (coreCheck) {
      return res.status(409).json({ error: 'User email already exists' });
    }
    coreCheck = await User.findOne({ username: attributes.username });
    if (coreCheck) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(attributes.password, saltRounds);
    attributes.password = hashedPassword;
    try {
      // Create a new user
      const user = await User.createUser(attributes);
      return res.status(201).json({
        msg: 'User object successfully created',
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async resetPassword(req, res) {
    // check if the email is valid
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        error: 'Missing email',
        resolve: 'Please provide your email',
        reqFormat: ' { email:  <string> }',
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }
    // Generate and send password reset token
    const resetToken = await user.generateOTP();
    try {
      await mailClient.sendToken(user);
    } catch (err) {
      return res.status(500).json({
        error: 'Mail Client Error',
      });
    }
    return res.status(201).json({
      message: 'Password reset token sent successfully',
      email: student.email,
      resetToken,
    });
  }

  static async setNewPassword(req, res) {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Missing token' });
    }
    const data64 = await authClient.signInPrecheck(req);
    if (data64.error) {
      return res.status(400).json({ error: data64.error });
    }
    const dataDecode = await authClient.singinDecrypt(data64);
    if (dataDecode.error) {
      return res.status(400).json({ error: dataDecode.error });
    }
    const { email, password } = decodeData;
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }
    try {
      // check if server is up before verifying
      if (!await dbClient.isAlive()) {
        return res.status(500).json({ error: 'Database connection failed' });
      }
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ error: 'Invalid token' });
      }
      // hash the password using bcrypt
      const hashedPwd = await bcrypt.hash(password, 10);
      let user = await existingUser.validateOTP(token);
      if (student.error) {
        return res.status(404).json({ error: student.error });
      }
      user = await student.changePassword(hashedPwd);
      if (!user) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      // check if server is up before verifying
      if (!await dbClient.isAlive()) {
        return res.status(500).json({ error: 'Database connection failed' });
      }
      // setup JWT using token for this object
      // const xToken = await authClient.createXToken(student.id);
      return res.status(201).json({
        message: 'Password reset successfully',
        email: user.email,
        // xToken,
      });
      // needed for the student profile activation
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: err });
    }
  }

  static async setChangePassword(req, res) {
    // Implement JWt here
    // const rdfxn = await authClient.checkCurrConn(req, res);
    // if (rdfxn.error) {
    //   return res.status(401).json({
    //     error: rdfxn.error,
    //   });
    // }
    // const { ID, xToken } = rdfxn;
    const user = await User.findById(ID);
    if (!user) {
      return res.status(404).json({ error: 'User Object not found' });
    }
    const { email, oldPassword, newPassword } = req.body;
    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({
        error: 'Missing required fields',
        reqFields: ['email', 'oldPassword', 'newPassword'],
        format: 'email: string, oldPassword: string, newPassword: string',
      });
    }
    // check if server is up before verifying
    if (!await dbClient.isAlive()) {
      return res.status(500).json({ error: 'Database connection failed' });
    }
    // compare old password to the hashed password in the database
    const isMatch = await bcrypt.compare(oldPassword, student.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid old password' });
    }
    // hash the password using bcrypt
    const hashedPwd = await bcrypt.hash(newPassword, 10);
    try {
      const updatedUser = await student.changePassword(hashedPwd);
      if (updatedUser.error) {
        return res.status(400).json({ error: updatedUser.error });
      }
      return res.status(201).json({
        message: 'Password changed successfully',
        email: updatedUser.email,
        // Token,
      });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  static async login(req, res) {
    const data64 = await authClient.signInPrecheck(req);
    if (data.error) {
      return res.status(400).json({ error: data64.error });
    }
    const decodeData = await authClient.decodeLoginToken(encryptToken);
    if (decodeData.error) {
      return res.status(400).json({ error: decodeData.error });
    }
    const { email, password } = decodeData;
    if (!email) {
      return res.status(400).json({
        error: 'Missing email address',
        reqFormat: ' { email:  <string>, password:  <string> }',
      });
    }
    if (!password) {
      return res.status(400).json({
        error: 'Missing password',
        reqFormat: ' { email:  <string>, password:  <string> }',
      });
    }
    try {
      if (!dbClient.isAlive()) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      const user = await Student.findOne({ email });
      if (!email) {
        return res.status(400).json({ error: 'Email address not found' });
      }
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
      // set up JWT token using this credentials
      // const xToken = await authClient.createXToken(user.id);
      // if (xToken.error) {
      //   return res.status(500).json({
      //     error: 'Internal Server Error',
      //     msg: xToken.error,
      //   });
      // }
      return res.status(201).json({
        message: 'Login successful',
        email: user.email,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to login' });
    }
  }

  static async logout(req, res) {
    const data64 = await authClient.signInPrecheck(req);
    if (data.error) {
      return res.status(400).json({ error: data64.error });
    }
    const decodeData = await authClient.decodeLoginToken(encryptToken);
    if (decodeData.error) {
      return res.status(400).json({ error: decodeData.error });
    }
    return res.status(200).json({ message: 'Logout successful' });
  }
}

module.exports = UserController;
