// this will give the whole details about the user 
import userModel from "../models/userModel.js";

export const userData = async(request,response)=>{
    try {
        console.log('userData called with userId:', request.userId);
        const userId = request.userId;
        
        const user=await userModel.findById(userId);
        if(!user){
            return response.json(
                {
                    success:false,
                    message:"User not found!"
                }
            )
        }

        response.json(
            {
                success:true,
                userData:{
                    name:user.name,
                    email:user.email,
                    isVerified:user.isVerified
                }

            }
        )
    } catch (error) {
        console.log('userData error:', error);
        return response.json({
            success: false,
            message: error.message
        });
    }

}