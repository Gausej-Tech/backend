const express = require("express");
const {
  getPendingVideos,
  approveVideo,
  rejectVideo,
} = require("../../controller/adminController");
const { authorizeRoles } = require("../../middleware/roleMiddleware");
const checkForAuthenticationCookie = require("../../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/videos/pending",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["admin"]),
  getPendingVideos
);
router.put(
  "/videos/approve/:videoId",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["admin"]),
  approveVideo
);
router.delete(
  "/videos/reject/:videoId",
  checkForAuthenticationCookie("token"),
  authorizeRoles(["admin"]),
  rejectVideo
);

module.exports = router;
