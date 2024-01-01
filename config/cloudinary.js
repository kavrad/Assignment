//import cloudinary
const cloudinary=require("cloudinary").v2;

//require dotenv to load the environment variables
require("dotenv").config();

//function to connect server to cloudinary
const connectToCloudinary=()=>{
    return new Promise((res,rej)=>{
        try {
            cloudinary.config({
                cloud_name:process.env.CLOUD_NAME,
                api_key:process.env.CLOUDINARY_API_KEY,
                api_secret:process.env.CLOUDINARY_API_SECRET
            })
            res("Sucessfully connected to cloudinary");
        } catch (error) {
            console.log("Error in connecting to cloudinary",error);
            rej(error);
        }
    })
    
    
}

module.exports=connectToCloudinary;
