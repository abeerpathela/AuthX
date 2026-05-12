# AuthX

AuthX is a full-stack authentication system built using the MERN stack with secure user authentication, email verification using EmailJS, password reset functionality, JWT authentication, and deployment support for Vercel and Render.

---

# Features

* User Signup & Login
* JWT Authentication
* Email Verification with OTP
* Password Reset with OTP
* Protected User Routes
* MongoDB Database Integration
* EmailJS Integration
* Frontend deployed on Vercel
* Backend deployed on Render
* Responsive UI

---

# Tech Stack

## Frontend

* React.js
* Vite
* Axios
* React Toastify
* React Icons

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Cookie Parser
* EmailJS

---

# Project Structure

```bash
AuthX/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/abeerpathela/AuthX.git
cd AuthX
```

---

# Backend Setup

```bash
cd backend
npm install
```

## Create `.env` File

```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
NODE_ENV=development

FRONTEND_URL=http://localhost:5173

EmailJS_ServiceId=YOUR_SERVICE_ID
EmailJS_TemplateId=YOUR_TEMPLATE_ID
EmailJS_APIKey=YOUR_PUBLIC_KEY
EmailJS_APISecret=YOUR_PRIVATE_KEY
```

## Start Backend

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

## Start Frontend

```bash
npm run dev
```

---

# EmailJS Setup

1. Create an account on EmailJS.
2. Create a Gmail Email Service.
3. Create an Email Template.
4. Enable:

```txt
Account → Security → Allow API access for non-browser environments
```

5. Add these template variables:

```txt
{{to_name}}
{{to_email}}
{{subject}}
{{message}}
{{otp}}
```

---

# Deployment

## Frontend Deployment (Vercel)

* Import GitHub repository into Vercel.
* Select `frontend` as root directory.
* Add environment variables if needed.
* Deploy.

---

## Backend Deployment (Render)

### Root Directory

```txt
backend
```

### Build Command

```bash
npm install
```

### Start Command

```bash
npm start
```

### Environment Variables

Add all backend `.env` variables in Render dashboard.

---

# CORS Configuration

The backend allows requests from:

```js
const allowedOrigins = [
  "http://localhost:5173",
  "https://auth-x-one.vercel.app",
  process.env.FRONTEND_URL,
];
```

---

# API Routes

## Authentication Routes

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/send-verify-otp
POST /api/auth/verify-account
POST /api/auth/send-reset-otp
POST /api/auth/reset-password
```

## User Routes

```txt
GET /api/user/data
```

---

# Important Notes

* Never push `.env` files to GitHub.
* Never push `node_modules` folder.
* Add these to `.gitignore`:

```txt
node_modules
.env
```

---

# Future Improvements

* Google Authentication
* Role Based Access
* Dark/Light Theme Toggle
* Profile Upload
* Two Factor Authentication

---

# Author

## Abeer Pathela

* GitHub: [https://github.com/abeerpathela](https://github.com/abeerpathela)
* LinkedIn: [https://www.linkedin.com/](https://www.linkedin.com/)

---

# License

This project is licensed under the MIT License.
