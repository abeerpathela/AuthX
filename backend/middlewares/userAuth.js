import { response } from "express";
import jwt from "jsonwebtoken";

// this is just to check that the token is valid or not 

const userAuth =   async(request,response,next)=>{
    const {token} = request.cookies;

    if(!token){
        return response.json(
            {
                success:false,
                message:"Not Authorized Login again "
            }
        )
    }

    try{
        const tokenDecode= jwt.verify(token,process.env.JWT_SECRET)
        if(tokenDecode.id){
            request.userId = tokenDecode.id
        }
        else{
            return response.json(
                {
                    success:false,
                    message:"Not Authorized Login again "
                }
            )
        }
        next(); // this will call the controller 
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

export default userAuth;