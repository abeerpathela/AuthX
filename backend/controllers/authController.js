// here we will create various functions such as how to login signup etc 
import bcrypt from 'bcryptjs';
// import { JsonWebTokenError } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import { request } from 'express';
import transporter from '../config/NodeMailer.js';

export const signUp= async(request,response)=>{

    const {name,email,password}=request.body;

    if(!name || !email || !password){
        return response.json(
            {
                success:false,
                message:`Missing details`
            }
        )
    }

    try{
        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return response.json(
                {
                    success:false,
                    message:`User Already Exists!`
                }
            )
        }
        else{
            const hashedPassword=await bcrypt.hash(password,10);

            const user=new userModel(
                {
                    name,
                    email,
                    password:hashedPassword
                }
            );
            await user.save();

            const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: '1d'});

            response.cookie('token',token,{
                httpOnly:true,
                secure:process.env.NODE_ENV === 'prodution',  // this will return true when this condition is true else false
                sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict', // strict means frontend and backend are on same pc or site 
                maxAge: 1*24*60*60*1000 // as we have given it for 1 day but the value goes in millisecond 
            });

            // sending mail on new user 
            const mailOptions={
                from:process.env.SENDER_EMAIL,
                to: email,
                subject:`Welcome ${name} to AuthX`,
                text:`Welcome to AuthX!\n You have successfully signed in and can now securely access your account. We’re glad to have you here. \nExplore the platform, manage your activities, and enjoy a safe and seamless experience.`
            }

            try{
                const info = await transporter.sendMail(mailOptions);
                console.log("Mail sent:", info);
            }catch(err){
                console.log("Mail error:", err);
            }
            

            return response.json({
                success:true,
                message:"User successfully registered"
            })

        }
    }
    catch(err){
        response.json(
            {
                success:false,
                message:err.message
            }
        )
    }
}

export const signIn= async(request,response)=>{

    const {email,password}=request.body;

    if(!email || !password){
        return response.json(
            {
                success:false,
                message:`Email and password are must required fields`
            }
        )
    }

    try{
        const user= await userModel.findOne({email}); // this will get all the details of the particular mail from the database 
        if(!user){
            return response.json(
                {
                    success:false,
                    message:"User not found!"
                }
            )
        }
        const isMatch= await bcrypt.compare(password,user.password); // it will return true or false 

        if(!isMatch){
            return response.json(
                {
                    success:false,
                    message:"Invalid Credentials"
                }
            )
        }
         
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: '1d'});

        response.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'prodution',  // this will return true when this condition is true else false
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict', // strict means frontend and backend are on same pc or site 
            maxAge: 1*24*60*60*1000 // as we have given it for 1 day but the value goes in millisecond 
        });

        return response.json({
            success:true,
            message:"User found"
        })

    }
    catch(err){
        return response.json(
            {
                success:false,
                message:err.message
            }
        )
    }
}

export const logout= async(request,response)=>{
    try{
        response.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'prodution',  // this will return true when this condition is true else false
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return response.json(
            {
                success:true,
                message:"Logged out successfully"
            }
        )
    }
    catch(err){
        return response.json(
            {
                success:false,
                message:err.message
            }
        )
    }
}

export const sendVerifyOtp = async(request,response)=>{
    try{
        const {userId} = request.body;
        const user=await userModel.findById(userId);
        if(user.isAccountVerified){
            return response.json({
                success:false,
                message:"Account already verified"
            })
        }
        const otp=String(Math.floor(100000+Math.random()*900000));
        user.verifyOtp= otp;
        user.verifyOtpExpireAt = Date.now() + 24*60*60*1000; // this makes it expire within 1 day 
        await user.save();

            const mailOptions={
                from:process.env.SENDER_EMAIL,
                to: user.email,
                subject:`Verify your email at AuthX`,
                text:`Hello,
                    Your One-Time Password (OTP) for verifying your email on AuthX is:\n
                    ${otp}\n
                    This code is valid for the next 10 minutes. Please do not share this code with anyone for security reasons.\n
                    If you did not request this verification, you can safely ignore this email.\n
                    Thank you for using AuthX.\n
                    Best regards,\n
                    AuthX Team`
            }

            try{
                const info = await transporter.sendMail(mailOptions);
                console.log("Mail sent:", info);
            }catch(err){
                console.log("Mail error:", err);
            }


            response.json({
                success:true,
                message:"OTP Verification sent to mail successfully!"
            })

    }
    catch(err){
        return response.json({
            success:false,
            message:err.message
        })
    }
}

export const verifyEmail = async(request,response)=>{

        const {userId,otp}= request.body;
        if(!userId || !otp){
            return response.json(
                {
                    success:false,
                    message:"Invalid Details"
                }
            )
        }
        try{
            const user=await userModel.findById(userId);
            if(!user){
                return response.json({
                    success:false,
                    message:"User not found!"
                })
            }
            // if(user.isAccountVerified){
            //     return response.json({
            //         success:false,
            //         message:"Account already verified"
            //     })
            // }

            if(user.verifyOtp === '' || user.verifyOtp !== otp ){
                return response.json(
                    {
                        success:false,
                        message:"Invalid otp"
                    }
                )
            }

            if(user.verifyOtpExpireAt < Date.now()){
                return response.json({
                    success:false,
                    message:"Otp expired!"
                })
            }

            user.isAccountVerified = true;
            user.verifyOtp= '';
            user.verifyOtpExpireAt=0;

            await user.save();
            return response.json(
                {
                    success:true,
                    message:"Email verified successfully"
                }
            )
        }
        catch(error){
            return response.json({
                success:false,
                message:"Failed to verify the email"
            })
        }
}

export const isAuthenticated = async(request,response)=>{
    try{
       return response.json(
        {
            success:true
        }
       ) ;
    }
    catch(err){
        return response.json({
            success:false,
            message:err.message
        })
    }
}

export const sendResetOtp = async(request,response)=>{
    const {email} = request.body;
    if(!email){
        return response.json(
            {
                success:false,
                message:"Email required!"
            }
        )
    }
    try{
        const user= await userModel.findOne({email});
        if(!user){
            return response.json(
                {
                    success:false,
                    message:"User not found!"
                }
            )
        }
        const otp=String(Math.floor(100000+Math.random()*900000));
        user.resetOtp= otp;
        user.resetOtpExpireAt = Date.now() + 15*60*1000; // this makes it expire within 15 minutes 
        await user.save();

        const mailOptions={
            from:process.env.SENDER_EMAIL,
            to: user.email,
            subject:`Reset your password at AuthX`,
                text:`Hello,
                    Your One-Time Password (OTP) for resetiing your password on AuthX is:\n
                    ${otp}\n
                    This code is valid for the next 15 minutes. Please do not share this code with anyone for security reasons.\n
                    If you did not request this verification, you can safely ignore this email.\n
                    Thank you for using AuthX.\n
                    Best regards,\n
                    AuthX Team`
        }

        try{
            const info = await transporter.sendMail(mailOptions);
            console.log("Mail sent:", info);
        }catch(err){
            console.log("Mail error:", err);
        }


        return response.json({
            success:true,
            message:"Password reset OTP Verification sent to mail successfully!"
        })

    }
    catch(err){
        return response.json(
            {
                success:false,
                message:err.message
            }
        )
    }
}

export const resetUserPassword = async(request,response)=>{
    const {email,otp,newPassword} = request.body;

    if(!email || !otp || !newPassword){
        return response.json(
            {
                success:false,
                message:"Any field is left empty"
            }
        )
    }

    try{
        const user = await userModel.findOne({email});
        if(!user){
            return response.json(
                {
                    success:false,
                    message:"User not found!"
                }
            )
        }

        if(user.resetOtp == '' || user.resetOtp != otp){
            return response.json(
                {
                    success:false,
                    message:"Invalid resend-otp !"
                }
            )
        }

        if(user.resetOtpExpireAt < Date.now()){
            return response.json(
                {
                    success:false,
                    message:"resend-otp expired!"
                }
            )
        }

        const hashedPassword= await bcrypt.hash(newPassword,10);
        user.password=hashedPassword;
        user.resetOtp='';
        user.resetOtpExpireAt = 0; 

        await user.save();

        return response.json(
            {
                success:true,
                message:"Password reset successful"
            }
        )

    }
    catch(err){
        return response.json(
            {
                success:false,
                message:err.message
            }
        )
    }
}