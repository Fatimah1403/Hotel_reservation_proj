const Hotel = require('../models/Hotel');

class HotelController {
  static async getAllHotels(req, res) {
    const hotels = await Hotel.find();
    return res.status(200).json(hotels);
  }
}

module.exports = HotelController;
