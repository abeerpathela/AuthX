import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from "./config/MongoDB.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";


const app=express();
const port=process.env.PORT || 5000;

// database connection 
connectDB();

const allowedOrigins = ['http://localhost:5173']

// middlewares setup 
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins,credentials: true}));


// API Endpoints
app.get('/',(request,response)=>{
    response.send("API WORKING");
})
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);

app.listen(port,()=>{
    console.log(`Server started at port number ${port}`);
})


