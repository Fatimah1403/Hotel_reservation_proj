const mongoose = require('mongoose');

const hotel = {
  name: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  distance: { type: String, required: true },
  photos: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  rating: { type: Number, minimum: 0, maximum: 5 },
  cheapestPrice: { type: Number, required: true },
  rooms: String,

};
const hotelSchema = new mongoose.Schema(hotel, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
