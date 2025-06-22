const cloudinary = require("../cloudinarySetup/cloudinaryConfig");
const {
  sendVideoUploadEmailToUser,
  sendVideoApprovalRequestToAdmin,
} = require("../emailService/userVideoUploadInfo");
const User = require("../model/userModel");
const Video = require("../model/videoModel");
const fs = require("fs");

const uploadVideo = async (req, res) => {
  try {
    const { title, description, category, coverImage,videoCount } = req.body;
    const userId = req.user.id;
    const filePath = req.file.path;
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      folder: "videos",
      timeout: 120000,
      eager: [
        {
          streaming_profile: "full_hd",
          format: "m3u8",
        },
      ],
      eager_async: false,
    });

    const m3u8Url = result.eager?.[0]?.secure_url;

    fs.unlinkSync(filePath);

    const newVideo = await Video.create({
      title,
      description,
      cloudinaryUrl: result.secure_url,
      streamUrl: m3u8Url,
      publicId: result.public_id,
      category,
      coverImage,
      isApproved: false,
      userId,
      videoCount
    });

    await User.findByIdAndUpdate(userId, {
      $inc: { videoCount: 1 },
    });

    const user = await User.findById(userId);

    if (user) {
      await sendVideoUploadEmailToUser(user.fullName, user.email, title);
      await sendVideoApprovalRequestToAdmin(title, user.fullName);
    }

    return res.status(201).json({ success: true, video: newVideo });
  } catch (err) {
    console.error(" Upload error:", err);
    return res
      .status(500)
      .json({ success: false, error: "Server error during upload" });
  }
};

const getAllVideos = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = { isApproved: true };

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const videos = await Video.find(filter)
      .populate("userId", "fullName profilePhoto")
      .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

const getLatestVideos = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = { isApproved: true };

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const videos = await Video.find(filter)
      .populate("userId", "fullName profilePhoto")
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).json(videos);
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

const streamVideo = async (req, res) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return res.status(400).json({ error: "Public ID is required" });
    }

    const video = await Video.findOne({ publicId, isApproved: true });

    if (!video || !video.streamUrl) {
      return res
        .status(404)
        .json({ error: "Approved video or stream URL not found" });
    }

    return res.status(200).json({ hlsUrl: video.streamUrl });
  } catch (err) {
    console.error("Stream error:", err);
    res.status(500).json({ error: "Streaming failed" });
  }
};

const getMyVideos = async (req, res) => {
  try {
    const userId = req.user.id;

    const videos = await Video.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, videos });
  } catch (error) {
    console.error("Failed to fetch user's videos:", error);
    res
      .status(500)
      .json({ success: false, error: "Server error fetching videos" });
  }
};

module.exports = {
  uploadVideo,
  getAllVideos,
  streamVideo,
  getMyVideos,
  getLatestVideos,
};
