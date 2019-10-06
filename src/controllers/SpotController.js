const Spot = require("../models/Spot");
const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const { tag } = req.query;
    const spots = await Spot.find({ tags: tag });
    return res.json(spots);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { name, price, hour, address, description, tags } = req.body;
    const { user_id } = req.headers;

    var token = req.headers["x-access-token"];
    const user = await User.findById(user_id);

    if (!token) {
      return res.status(400).json({ error: "Token inválido " });
    }

    if (!user) {
      return res.status(400).json({ error: "User does not exists " });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      name,
      tags: tags.split(",").map(tag => tag.trim()),
      tags,
      price,
      hour,
      address,
      description
    });

    return res.json(spot);
  }
};
