/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jest/require-hook */
const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

async function createUser(attributes) {
  const user = new mongoose.model('User')(attributes);
  await user.save();
  return user;
}

async function generateOTP() {
  this.resetPwd = true;
  this.resetTTL = Date.now() + (1000 * 60 * 5); // 5 minutes validity
  this.resetOTP = uuid().slice(-7, -1); // random 6-character token
  await this.save();
  return this.resetOTP;
}

async function validateOTP(OTP) {
  if (this.resetPwd && this.resetOTP === String(OTP).toLowerCase()) {
    // Case-insensitive token
    if (this.resetTTL < Date.now()) {
      return { error: 'ValueError: OTP has expired' };
    }
    this.resetOTP = undefined;
    this.resetTTL = undefined;
    this.resetPwd = undefined;
    return this.save();
  }
  return { error: 'ValueError: Invalid OTP' };
}

async function resetPassword(OTP, newPassword) {
  const { error } = await this.validateOTP(OTP); // Validate OTP
  if (error) {
    return { error };
  }
  // Update password and return user object with updated password
  this.password = newPassword;
  return this.save();
}

async function changePassword(newPassword) {
  this.password = newPassword;
  this.resetOTP = undefined;
  this.resetTTL = undefined;
  this.resetPwd = undefined;
  return this.save();
}

async function updateProfile(attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    this[key] = value;
  }
  return this.save();
}

module.exports = {
  createUser,
  generateOTP,
  validateOTP,
  resetPassword,
  changePassword,
  updateProfile,
};
