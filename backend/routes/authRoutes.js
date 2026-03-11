import express from 'express';
import { isAuthenticated, logout, resetUserPassword, sendResetOtp, sendVerifyOtp, signIn, signUp, verifyEmail } from '../controllers/authController.js';
import userAuth from '../middlewares/userAuth.js';
import { send } from 'vite';

const authRouter = express.Router();

authRouter.post('/signUp',signUp);
authRouter.post('/signIn',signIn);
authRouter.post('/logout',logout);
authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp); // these are the routes which are to be accessed by the logged in users only so that why we passed the middle waare in these api routes
authRouter.post('/verify-account',userAuth,verifyEmail);
authRouter.post('/is-authenticated',userAuth,isAuthenticated);
authRouter.post('/send-reset-otp',sendResetOtp);
authRouter.post('/reset-password',resetUserPassword);

export default authRouter;