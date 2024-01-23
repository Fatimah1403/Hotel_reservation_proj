const mongoose = require('mongoose');
const userMethods = require('./methods/userMethods');

const user = {
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  img: String,
  resetPwd: Boolean,
  resetTTL: Date,
  resetOTP: String,
};
const userSchema = new mongoose.Schema(user, { timestamps: true });

userSchema.statics.createUser = userMethods.createUser;
userSchema.methods.generateOTP = userMethods.generateOTP;
userSchema.methods.validateOTP = userMethods.validateOTP;
userSchema.methods.resetPassword = userMethods.resetPassword;
userSchema.methods.changePassword = userMethods.changePassword;
userSchema.methods.updateProfile = userMethods.updateProfile;

const User = mongoose.model('User', userSchema);

module.exports = User;
