//import jwt to generate and decode the tokens
const jwt=require("jsonwebtoken");

//import dotenv to load environment variables
require("dotenv").config();

//function to generate JWT token 
const generateToken=(tokenPayload)=>{
    return new Promise((res,rej)=>{
        try {
            const token=jwt.sign(tokenPayload,process.env.JWT_SECRET,{
                algorithm:"HS512",
                expiresIn:"1d",

            })
            res(token)
        } catch (error) {
            rej(error)
        }
    })
}

//function to verify that the token provided by user is same as one provided by server
const decodeToken=(token) =>{
   
    
        return new Promise((res,rej) => {
            jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if(err){
                    rej(err);
                }
                res(decoded)            
            })
        })
    
    
   
}

module.exports={
    generateToken,
    decodeToken
}