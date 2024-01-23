/* eslint-disable jest/require-hook */
const mongoose = require('mongoose');
// EXP = 30days
const EXP = 60 * 60 * 24 * 30; // 30days

const refreshToken = {
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
};

const refreshSchema = new mongoose.Schema(refreshToken, { timestamps: true });
refreshSchema.index({ createdAt: 1 }, { expireAfterSeconds: EXP });

const RefreshToken = mongoose.model('RefreshToken', refreshSchema);

module.exports = RefreshToken;
