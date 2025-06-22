const express = require("express");
const { getMyVideos } = require("../../controller/videoController");
const router = express.Router();




router.get("/my-videos",  getMyVideos);

module.exports = router;