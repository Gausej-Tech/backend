require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 7891;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
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

const userAuthRoute = require('./routes/userAuthRoute/userRoute')
const googleAuthRoute = require('./routes/googleAuthRoute/loginWithGoogle');
const userProfileRoute = require('./routes/userProfileRoute/userRoute');
const videoUploadRoute = require('./routes/uploadRoute/videoRoute')


app.use("/api/auth", userAuthRoute, googleAuthRoute);
app.use("/api/user", userProfileRoute, videoUploadRoute);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
