const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "pending", "deleted"],
      default: "active",
    },
    fullName: {
      type: String,
    },
    phone: {
      type: String,
      default: null,
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    websiteUrl: {
      type: String,
      default: null,
    },
    twitterLink: {
      type: String,
      default: null,
    },
    linkedinLink: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
      maxlength: 1000, 
    },
    otp: {
  type: String,
  default: null,
},
otpExpires: {
  type: Date,
  default: null,
},

  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
