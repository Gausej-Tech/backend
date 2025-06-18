const express = require("express");
const router = express.Router();
const upload = require("../../cloudinarySetup/cloudinaryVideo");

const { uploadVideo, getAllVideos, streamVideo } = require("../../controller/videoController");

router.post("/upload", upload.single("video"), uploadVideo);
router.get("/",getAllVideos);
router.get("/stream/:publicId", streamVideo);

module.exports = router;