//import cloudinary to upload user images
const cloudinary=require("cloudinary").v2;

//function that uploads the user and admin images from server to cloudinary
const imageUploader=async (file)=>{
    
        const base64EncodedImage = Buffer.from(file.buffer).toString("base64")
        const datauri=`data:${file.mimetype};base64,${base64EncodedImage}`;

        const res=await cloudinary.uploader.upload(datauri,{
            resource_type:"auto"
           })
           
           return res;  
    
   
}

module.exports=imageUploader;