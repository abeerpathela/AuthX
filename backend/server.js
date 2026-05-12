import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import connectDB from "./config/MongoDB.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

// Database connection
connectDB();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://auth-x-one.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

// Middlewares
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Not Allowed"));
      }
    },
    credentials: true,
  })
);

// Root route
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Start server
app.listen(port, () => {
  console.log(`Server started at port number ${port}`);
});