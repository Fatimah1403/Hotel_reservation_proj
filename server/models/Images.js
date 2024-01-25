// models/Image.js
const mongoose = require('mongoose');

const image = {
  url: { type: String, required: true },
  altText: { type: String, required: true },
};

const imageSchema = new mongoose.Schema(image, { timestamps: true });

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
