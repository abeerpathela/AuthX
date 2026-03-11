// this will give the whole details about the user 
import userModel from "../models/userModel.js";

export const userData = async(request,response)=>{
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

}