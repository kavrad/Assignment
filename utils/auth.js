//import User model
const User=require("../models/User");

//import required constants
const {PASSWORD_REGEX,PHONE_REGEX, JWT_PAYLOAD}=require("../utils/constants");

//import functions to hash and compare passwords
const { generatePassword, comparePasswords } = require("./bcryptUasge");

//import function to generate token using jsonwebtoken
const { generateToken } = require("./jwtService");

//import function to upload images user images to cloudinary 
const imageUploader = require("./imageUploader");

//function creates user and admin account 
const registerUser=async (userData,file=null,res,role)=>{

    //extract email phoneNumber name and password from userData
    const {email,phoneNumber,name,password}=userData;
   
    //if user has uploaded the file then upload the user image to cloudinary
    const imageUrl= file ? await imageUploader(file) : null;
   
    //check all the input fields are present 
    switch(true){
        case !email && !phoneNumber : {
          message="Either email or phone number is required!!"
          return res.status(400).json({
            success:false,
            message:message
          });
        }
        case !name :{
            message="your name is empty!!"
            return res.status(400).json({
                success:false,
                message:message
              });
        }
        case !password:{
            message="password is required!!"
            return res.status(400).json({
                success:false,
                message:message
              });
        }
    }
    
    //check the strength of the user password against password regex
    if(!PASSWORD_REGEX.test(password)){
        return res.status(403).json({
            success:false,
            message:"Password must have atleast 8 characters one uppercase,one lowercase and one special character and a number!!"
        })
    }
    
    //if phonenumber is present check if phonenumber has 10 digits or not
    if(phoneNumber && (phoneNumber.length !== 10 || PHONE_REGEX.test(phoneNumber))){
        return res.status(403).json({
            success:false,
            message:"Please provide a valid phone number!!"
        })
    }
    
    //if email is present -
    if(email){
        //check if user already exists or not
        const user=await User.findOne({email});
       if(user){
        return res.json({
            success:false,
            message:"User alreay registered!!"
        })
       }
       //hash the password using bcrypt
       const hashedPassword=await generatePassword(password)

       //create new user if user is not registered already
       const newUser=await User.create({
        accountType:role ? role : "User",
        email,
        name,
        password:hashedPassword,
        phoneNumber,
        image:imageUrl
       })

       console.log("NEW USER REGISTERED ------------>",newUser);

       return res.status(201).json({
        success:true,
        message:"User registered sucessfully"
       })
    }

}

//function to implement login feature for users and admin
const userLogin=async (userData,res)=>{
    //extract email and password from user data
    const {email,password}= userData;
    
    //check all the input fields are provided
    switch(true){
        case !email:{
            return res.status(400).json({
                success:false,
                message:"Email is required!!"
            })
        }
        case !password:{
            return res.status(400).json({
                success:false,
                message:"Password is required!!"
            })
        }
    }

    //find if user is present
    const user=await findUser(email);
    
    if(!user){
        return res.status(404).json({
            success:false,
            message:"No such user found!!"
        })
    }

    //comapre the user password with the password present in db using bcrypt
    const result=await comparePasswords(user.password,password);
    
    //if it does not match return a response
    if(!result){
        return res.status(403).json({
            success:false,
            message:"Password does not exists!!"
        })
    }
    const payload=JWT_PAYLOAD(user)

   //if it matches then generate token using jsonwebtoken and send it in the response
    const token=await generateToken(payload);

    return res.status(200).json({
        success:true,
        token,
        message:"Login successful!!"
    })
}

//function to find the user in db
const findUser=async (email)=>{
  const user=await User.findOne({email});
   return user ? user : false;
}

module.exports={
    registerUser,userLogin
}