const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema(
  {
    thumbnail: String,
    name: String,
    data: String,
    price: Number,
    hour: String,
    address: String,
    description: String,
    tags: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    toJSON: { virtuals: true }
  }
);

SpotSchema.virtual("thumbnail_url").get(function() {
  return `https://sp-spots-api.herokuapp.com/files/${this.thumbnail}`;
});

module.exports = mongoose.model("Spot", SpotSchema);
