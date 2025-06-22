const express = require("express");
const { getPendingVideos, approveVideo, rejectVideo } = require("../../controller/adminController");
const router = express.Router();


router.get("/videos/pending",  getPendingVideos);
router.put("/videos/approve/:videoId", approveVideo);
router.delete("/videos/reject/:videoId",  rejectVideo);


module.exports = router;