const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const { createToken } = require("../authService/authService");
const setTokenCookie = require("../authService/setTokenCookie");
const clearTokenCookie = require("../authService/clearCookie");
const crypto = require("crypto");
const { sendOtpEmail } = require("../emailService/userAuthEmail");
const Video = require("../model/videoModel");

const signup = async (req, res) => {
  const {
    fullName,
    email,
    password,
    phone,
    bio,
    title,
    linkedinLink,
    twitterLink,
    websiteUrl,
    profilePhoto,
  } = req.body;
  if (!fullName || !email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = {
      fullName,
      email,
      password: hashedPassword,
      phone,
      bio,
      title,
      linkedinLink,
      twitterLink,
      websiteUrl,
      profilePhoto,
    };

    const newUser = await User.create(newUserData);

    return res.status(201).json({
      msg: "Signup successful, Please Login",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Internal server error from user signup: ${error}`,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (user.status !== "active") {
      return res.status(403).json({ msg: `Account is ${user.status}` });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ msg: "Password not matched" });
    }

    const token = createToken(user);
    setTokenCookie(res, token);
    const { password: _, ...userWithoutPassword } = user.toObject();
    return res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({ msg: `Server error: ${error}` });
  }
};

const handleLogout = (req, res) => {
  try {
    clearTokenCookie(res);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Server error: ${error}` });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const emailSent = await sendOtpEmail(user.fullName, user.email, otp);

    if (!emailSent) {
      return res.status(500).json({ msg: "Failed to send OTP email" });
    }

    return res.status(200).json({
      msg: "OTP sent to your email successfully",
      user
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Server error from forgotPassword: ${error.message}`,
    });
  }
};

const handleVerifyResetPasswordOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    const user = await User.findOne({
      otp: otp,
      otpExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      user,
      email: user.email,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while verifying OTP",
    });
  }
};

const resetPasswordAfterOtp = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while resetting password",
    });
  }
}

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      fullName,
      phone,
      websiteUrl,
      twitterLink,
      linkedinLink,
      title,
      bio,
    } = req.body;

    const profilePhoto = req.file ? req.file.path : undefined;

    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (phone) updateData.phone = phone;
    if (websiteUrl) updateData.websiteUrl = websiteUrl;
    if (twitterLink) updateData.twitterLink = twitterLink;
    if (linkedinLink) updateData.linkedinLink = linkedinLink;
    if (title) updateData.title = title;
    if (bio) updateData.bio = bio;
    if (profilePhoto) updateData.profilePhoto = profilePhoto;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      select: "-password", 
    });

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      msg: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ msg: "Server error while updating profile" });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password -__v");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ msg: "Server error fetching profile" });
  }
};




const deleteVideoFromDatabase = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ success: false, error: "Video not found" });
    }

      if (video.userId){
      await User.findByIdAndUpdate(video.userId, {
        $inc: { videoCount: -1 },
      });
    }
    await Video.findByIdAndDelete(videoId);

    res.status(200).json({ success: true, message: "Video deleted from database" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, error: "Server error during deletion" });
  }
};


module.exports = {
  signup,
  login,
  handleLogout,
  forgotPassword,
 handleVerifyResetPasswordOtp,
  updateUserProfile,
  getUserProfile,
  resetPasswordAfterOtp ,
  deleteVideoFromDatabase
};
