//import mongoose
const mongoose=require("mongoose");

//define users schema to store users details in db
const usersSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        maxLength:10
    },
    image:String,
    accountType:{
        type:String,
        enum:["Admin","User"],
    },
    
})

module.exports=mongoose.model("User",usersSchema);