
Backend Server of Gausej Tech

This backend project provides a secure user authentication system with features including:

-  JWT-based authentication
-  Email verification using Nodemailer
-  Google OAuth login
-  Modular folder structure
-  MongoDB database integration

 Folder Structure

backend/
│
├── authService/              # Handles token generation, hashing, etc.
├── controller/               # Controller logic for each route
├── emailService/             # Nodemailer logic for sending OTPs
├── middleware/               # Auth middlewares like token check
├── model/                    # MongoDB models (User etc.)
├── mongodbConfig/            # MongoDB connection logic
├── nodemailerConfig/         # Email transport configuration
├── routes/                   # Application routes
│   ├── googleAuthRoute/      # Google OAuth related routes
│   ├── userAuthRoute/        # Signup, login, logout routes
│   └── userProfileRoute/     # User profile management
│
├── .env                      # Environment variables
├── .gitignore                # Files/folders to ignore in Git
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Exact dependency tree
├── README.md                 # You're reading it 
└── server.js                 # Entry point to the app

 Getting Started

 Prerequisites
- Node.js (v16 or later)
- MongoDB (Local or Cloud)
- Git

 Clone and Install

# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Go to the project directory
cd your-repo-name/backend

# Install dependencies
npm install

 Environment Setup

Create a `.env` file in the `backend/` directory and add the following:

PORT = your port
MONGO_URL =   your mongodb uri
JWT_SECRET = your jwt secret
ADMIN_EMAIL = your admin email
ADMIN_PASSWORD = your admin email password

AWS_ACCESS_KEY= your aws acces key
AWS_SECRET_KEY= your aws secret key
AWS_REGION_S3= your aws region
AWS_BUCKET_NAME= your aws bucket name

CLIENT_URL = your frontend URL
GOOGLE_CLIENT_ID = your google client id
GOOGLE_CLIENT_SECRET = your google client secret
GOOGLE_REDIRECT_URI = your google callback uri

▶ Running the App

# Run the server
npm start

# Or using nodemon (for development)
npm run dev

 API Routes Overview

Auth & Profile Routes
| Method | Route           | Description         |
|--------|------------------|---------------------|
| POST   | /auth/signup     | Register user       |
| POST   | /auth/login      | Login user          |
| POST    | /auth/logout     | Logout user         |
| POST    | /auth/forgot-password        | Forget password Route       |
| POST   | /auth/reset-password/:resetToken     | Reset Password Route  |
| GET    | /user/profile   | Get user Profile |
| PUT    | /auth/update-profile    | Update user profile  |

Google Auth Route
| Method | Route           | Description         |
|--------|------------------|---------------------|
| GET    | /auth/google     | Google login        |
| GET    | /auth/google/callback  | Google callback route  |



 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Nodemailer
- Google OAuth2
- JWT
- dotenv

 Author

Made by Developer team of GausejTech

All Right reserved @GausejTech

📃 License

This project is open source under the MIT License.
