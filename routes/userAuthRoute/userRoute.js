const express = require("express");
const { signup, login, handleLogout, forgotPassword, handleResetPassword } = require("../../controller/userController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", handleLogout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", handleResetPassword);


module.exports = router;  