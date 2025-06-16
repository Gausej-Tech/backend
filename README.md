
#  Backend Server of Gausej Tech

This backend project provides a secure user authentication system with features including:

-  JWT-based authentication  
-  Email verification using Nodemailer  
-  Google OAuth login  
-  Modular folder structure  
-  MongoDB database integration

---

##  Folder Structure

```
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
```

---

##  Getting Started

###  Prerequisites

- Node.js (v16 or later)  
- MongoDB (Local or Cloud)  
- Git

###  Clone and Install

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# Navigate to the project directory
cd your-repo-name/backend

# Install dependencies
npm install
```

---

###  Environment Setup

Create a `.env` file in the `backend/` directory and add the following:

```env
PORT=your_port
MONGO_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_email_password

AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
AWS_REGION_S3=your_aws_region
AWS_BUCKET_NAME=your_aws_bucket_name

CLIENT_URL=your_frontend_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=your_google_callback_uri
```

---

### ▶ Running the App

```bash
# Start the server
npm start

# OR for development using nodemon
npm run dev
```

---

##  API Routes Overview

### Auth & Profile Routes

| Method | Route                             | Description             |
|--------|-----------------------------------|-------------------------|
| POST   | /auth/signup                      | Register user           |
| POST   | /auth/login                       | Login user              |
| POST   | /auth/logout                      | Logout user             |
| POST   | /auth/forgot-password             | Forgot password route   |
| POST   | /auth/reset-password/:resetToken | Reset password          |
| GET    | /user/profile                     | Get user profile        |
| PUT    | /auth/update-profile              | Update user profile     |

### Google Auth Routes

| Method | Route                   | Description             |
|--------|-------------------------|-------------------------|
| GET    | /auth/google            | Google login            |
| GET    | /auth/google/callback   | Google callback route   |

---

##  Tech Stack

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Nodemailer  
- Google OAuth2  
- JWT  
- dotenv

---

##  Author

Made by the Developer Team of **Gausej Tech**

**All rights reserved © Gausej Tech**

---

##  License

This project is open source under the **MIT License**
