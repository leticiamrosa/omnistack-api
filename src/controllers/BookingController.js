const Booking = require("../models/Booking");

module.exports = {
  async store(req, res) {
    const { user_id } = req.headers;
    const { id } = req.params;
    const { data } = req.body;
    const booking = await Booking.create({
      user: user_id,
      spot: id,
      data
    });

    await booking
      .populate("spot")
      .populate("user")
      .execPopulate();

    const ownerSocket = req.connectedUsers[booking.spot.user];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit("booking_request", booking);
    }

    return res.json(booking);
  }
};
