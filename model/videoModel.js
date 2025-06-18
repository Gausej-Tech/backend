const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  publicId: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
});

module.exports = mongoose.model("Video", videoSchema);
