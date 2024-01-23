const mongoose = require('mongoose');

const room = {
  title: { type: String, required: true },
  maxPeople: { type: Number, required: true },
  desc: { type: String, required: true },
  roomNumbers: [{ type: Number, unavailableDates: { type: [Date] } }],
};
const roomSchema = new mongoose.Schema(room, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
