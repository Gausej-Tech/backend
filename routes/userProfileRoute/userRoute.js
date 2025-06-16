const express = require("express");
const checkForAuthenticationCookie = require("../../middleware/authMiddleware");
const { getUserProfile, updateUserProfile } = require("../../controller/userController");
const router = express.Router();

router.get(
  "/profile",
  checkForAuthenticationCookie("token"),
  getUserProfile
);


router.put(
  "/update-profile",
  checkForAuthenticationCookie("token"),
  updateUserProfile
);

module.exports = router;
