import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    verifyOtp:{
        type:String,
        default:''
    },
    verifyOtpExpireAt:{
        type:Number,
        default:0
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetOtp:{
        type:String,
        default:''
    },
    resetOtpExpireAt:{
        type:Number,
        default:0
    }
})

const userModel = mongoose.models.user || mongoose.model('user',userSchema);  // here this will first find if there is any model already created if yes then it will use that other wise it will create as we define above 

// as everytime the model will be created when this code is ran 

export default userModel;