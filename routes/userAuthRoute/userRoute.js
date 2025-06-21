const express = require("express");
const { signup, login, handleLogout, forgotPassword, handleResetPassword, handleVerifyResetPasswordOtp, resetPasswordAfterOtp } = require("../../controller/userController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", handleLogout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", handleVerifyResetPasswordOtp);
router.post("/reset-password", resetPasswordAfterOtp);


module.exports = router;  