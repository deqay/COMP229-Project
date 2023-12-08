const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  userId: { type: String },
  productId: { type: String, require: true },
  comment: { type: String },
  rating: { type: Number },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: { type: String },
});
module.exports = mongoose.model("Review", reviewSchema);
