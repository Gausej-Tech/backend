const express = require("express");
const checkForAuthenticationCookie = require("../../middleware/authMiddleware");
const { getUserProfile, updateUserProfile } = require("../../controller/userController");
const uploadImage = require("../../cloudinarySetup/cloudinaryImage");
const router = express.Router();

router.get(
  "/profile",
  checkForAuthenticationCookie("token"),
  getUserProfile
);


router.put(
  "/update-profile",
  checkForAuthenticationCookie("token"),
   uploadImage.single("profilePhoto"),
  updateUserProfile
);

module.exports = router;
