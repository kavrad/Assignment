//import user model
const User = require("../models/User");

//function to upload user images to cloudinary
const imageUploader = require("../utils/imageUploader");

//controller to get user information
exports.getUserDetails=async (req,res)=>{
    try {
         res.status(200).json({
            success:true,
            data:req.user,
            message:"Sucessfully fetched your information"
        })
    } catch (error) {
        console.log("Error in fetching your information");
        console.error("USER INFO FETCHING ERROR----------------->",error);
        res.status(500).json({
            success:false,
            message:"Something went wrong while fetching your information!!"
        })
    }
}

//controller to update user details
exports.modifyUserDetails=async (req,res)=>{
    try {
       //extract name from req.body
        const {name}=req.body;
        
        //if name or profilephoto is not provided return a response
        if(!name || !req.file){
            return res.status(400).json({
                success:false,
                message:"Please provide all the necessary info to modify your details!!"
            })
        }
        
        //if user is trying to modify his/her phone number or email then return a response
        if(req.body.phoneNumber || req.body.email){
            return res.status(403).json({
              success:false,
              message:"You cannot modify yur email or phone number"
            })
        }
        
        //upload his/her profile photo to cloudinary
        const imageUrl=await imageUploader(req.file);
       
        //update the user's name and profile photo url in users collection
        const updatedUser=await User.findByIdAndUpdate(req.user._id,{
            $set:{
                name,
                image:imageUrl.secure_url
            }
        },
        {
            new:true
        })

        res.status(200).json({
            success:true,
            data:updatedUser,
            message:"Sucessully updated your details!!"
        })
    } catch (error) {
        console.log("Error in updating your details");
        console.error("USER DETAILS UPDATE ERROR --------------------->",error)
        res.status(500).json({
            success:false,
            message:"Something went wrong while updating your details!!"
        })
    }
}

//controller to delete his/her account
exports.deleteAccount=async (req,res)=>{
    try {
        //delete his/her account from users collection
        const deleteUser=await User.findOneAndDelete({
            _id:req.user._id,
        },{
            new:true
        })

         res.status(200).json({
            success:false,
            message:"Sucessfully deleted your account",
            data:deleteUser
        })

    } catch (error) {
        console.log("Error in deleting your account");
        console.error("DELETE USER ACCOUNT ERROR ------------------>");
        res.status(500).json({
            success:false,
            message:"Something went wrong while deleting your account!!"
        })
    }
}