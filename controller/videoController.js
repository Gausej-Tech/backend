const cloudinary = require("../cloudinarySetup/cloudinaryConfig");
const Video = require("../model/videoModel");
const fs = require("fs");

const uploadVideo = async (req, res) => {
  try {
    const { title, description } = req.body;
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

    fs.unlinkSync(filePath);

    const newVideo = await Video.create({
      title,
      description,
      cloudinaryUrl: result.secure_url,
      publicId: result.public_id,
    });

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
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    console.error(" Failed to fetch videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

const streamVideo = async (req, res) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return res.status(400).json({ error: "Public ID is required" });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const hlsUrl = `https://res.cloudinary.com/${cloudName}/video/upload/sp_full_hd/videos/${publicId}.m3u8`;

    return res.status(200).json({ hlsUrl });
  } catch (err) {
    console.error("Stream error:", err);
    res.status(500).json({ error: "Streaming failed" });
  }
};

module.exports = { uploadVideo, getAllVideos, streamVideo };
