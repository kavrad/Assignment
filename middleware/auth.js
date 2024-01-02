//import User model
const User = require("../models/User");
const { ACCOUNT_TYPE } = require("../utils/constants");
const {decodeToken} = require("../utils/jwtService")

//middleware to authenticate a user
const isLoggedIn=async (req,res,next) => {
   try {

    //extract token from either body or headers from each request
    const token=req.body.token || req.headers["authorization"]
    
    //if token is not found then return response
    if(!token || !token.startsWith("Bearer")){
        return res.status(401).json({
            success:false,
            message:"Unauthorized!!"
        })
    }
   
    //verify the token provided by user in the request is same as provided by server
   const decoded = await decodeToken(token.split(" ")[1]);
    
   console.log("DECODE TOKEN -->",decoded)
    //check user exists with userId from decoded token
     const user=await User.findById(decoded.userId);
     
     //if not found return a response
     if(!user){
        return res.status(404).json({
            success:false,
            message:"Invalid token!!"
        })
     }
     
     
     req.user=user;
     next();

   } catch (error) {
      console.log("Error in authenticating the user ------>",error)
      res.json({
        success:false,
        message:"Cannot authenticate the user!!"
      })
   }
}

//middleware to check the user is admin or not
const isAdmin=(req,res,next)=>{
   try {
    
    if(req.user.accountType === ACCOUNT_TYPE.ADMIN){
      next();
    }else{
      throw new Error("You cannot do this!!")
    }

   

   } catch (error) {
      res.status(401).json({
      success:false,
      message:error.message
     })
   }
}

//middleare to check logged in person has user role or not
const isUser=(req,res,next)=>{
  try {
    if(req.user.accountType === ACCOUNT_TYPE.USER){
      next();
    }else{
      throw new Error("Not Authorized!!")
    }
  } catch (error) {
    res.status(401).json({
      success:false,
      message:error.message
    })
  }
}

module.exports={
    isUser,
    isAdmin,
    isLoggedIn
}