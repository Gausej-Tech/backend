const {
  sendVideoRejectedEmailToUser,
  sendVideoApprovedEmailToUser,
} = require("../emailService/userVideoUploadInfo");
const Video = require("../model/videoModel");

const getPendingVideos = async (req, res) => {
  try {
    const pendingVideos = await Video.find({ isApproved: false })
      .populate("userId", "fullName profilePhoto")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, pendingVideos });
  } catch (error) {
    console.error("Failed to fetch pending videos:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const approveVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findByIdAndUpdate(
      videoId,
      { isApproved: true },
      { new: true }
    ).populate("userId", "fullName profilePhoto");

    await sendVideoApprovedEmailToUser(
      video.userId.fullName,
      video.userId.email,
      video.title
    );

    if (!video) {
      return res.status(404).json({ success: false, error: "Video not found" });
    }

    res.status(200).json({ success: true, message: "Video approved", video });
  } catch (error) {
    console.error("Approve error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const rejectVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId).populate(
      "userId",
      "fullName email"
    );

    if (!video) {
      return res.status(404).json({ success: false, error: "Video not found" });
    }

    await sendVideoRejectedEmailToUser(
      video.userId.fullName,
      video.userId.email,
      video.title,
      "Inappropriate content"
    );

    await Video.findByIdAndDelete(videoId);

    //  Delete from Cloudinary
    // await cloudinary.uploader.destroy(video.publicId, { resource_type: "video" });

    res
      .status(200)
      .json({ success: true, message: "Video rejected and deleted" });
  } catch (error) {
    console.error("Reject error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = {
  rejectVideo,
  approveVideo,
  getPendingVideos,
};
