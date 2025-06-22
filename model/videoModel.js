const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: [
      "Startup Pitch",
      "Product Demo",
      "Business Idea",
      "Promotional",
      "Podcast",
      "Tutorial",
      "Other",
    ],
    required: true,
  },
  coverImage: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  cloudinaryUrl: {
    type: String,
  },
  streamUrl: {
    type: String,
  },
  publicId: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
