const express = require("express");
const router = express.Router();
const upload = require("../../cloudinarySetup/cloudinaryVideo");

const { uploadVideo, getAllVideos, streamVideo, getLatestVideos } = require("../../controller/videoController");
const { deleteVideoFromDatabase } = require("../../controller/userController");
const checkForAuthenticationCookie = require("../../middleware/authMiddleware");

router.post("/upload",  checkForAuthenticationCookie("token"), upload.single("video"), uploadVideo);
router.get("/",getAllVideos);
router.get('/latest',getLatestVideos)
router.get("/stream/:publicId", streamVideo);
router.delete("/video/:videoId",  checkForAuthenticationCookie("token"), deleteVideoFromDatabase);

module.exports = router;