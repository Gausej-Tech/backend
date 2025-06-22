const express = require("express");
const { getMyVideos } = require("../../controller/videoController");
const checkForAuthenticationCookie = require("../../middleware/authMiddleware");
const router = express.Router();
router.get("/my-videos", checkForAuthenticationCookie("token"), getMyVideos);

module.exports = router;
