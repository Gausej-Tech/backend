const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `video_${Date.now()}${path.extname(file.originalname)}`),
});

const videoUpload = multer({ storage });
module.exports = videoUpload;
