const Room = require('../models/Room');

class RoomController {
  static async getAllRooms(req, res) {
    const rooms = await Room.find();
    return res.status(200).json(rooms);
  }
}

module.exports = RoomController;
