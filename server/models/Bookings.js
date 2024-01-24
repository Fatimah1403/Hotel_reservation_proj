const mongoose = require('mongoose');

const bookings = {
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  roomId: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  price: { type: Number, required: true },
};
const bookingSchema = new mongoose.Schema(bookings, { timestamps: true });

const Bookings = mongoose.model('Bookings', bookingSchema);

module.exports = Bookings;
