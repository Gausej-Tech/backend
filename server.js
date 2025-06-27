require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 7891;

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.CLIENT_URL_1,
  process.env.CLIENT_URL_2,
];

app.use(
  cors({
    origin: function (origin, callback) {
  
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connectDB = require("./mongodbConnection/dbConnection");
connectDB();

const userAuthRoute = require("./routes/userAuthRoute/userRoute");
const googleAuthRoute = require("./routes/googleAuthRoute/loginWithGoogle");
const userProfileRoute = require("./routes/userProfileRoute/userRoute");
const videoUploadRoute = require("./routes/uploadRoute/videoRoute");
const userVideoRoute = require("./routes/userVideoRoute/userVideoRoute");
const adminRoute = require("./routes/adminRoute/videoApproval");

app.use("/api/auth", userAuthRoute, googleAuthRoute);
app.use("/api/user", userProfileRoute, videoUploadRoute, userVideoRoute);
app.use("/api/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
