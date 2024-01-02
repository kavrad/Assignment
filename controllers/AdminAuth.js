const { registerUser, userLogin } = require("../utils/auth");

//controller to create admin account
exports.signup=async (req,res)=>{
    try {
     await registerUser(req.body,req.file,res,"Admin");
        
    } catch (error) {
        console.log("Error in registering the user");
        console.error("SIGN UP ERROR ---------->",error)
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Unable to create your account!!"
        })
    }
}

//controller to implement login feature for admin
exports.login=async (req,res)=>{
    try {
        
        await userLogin(req.body,res)

    } catch (error) {
        console.log("Error in authenticating the user");
        console.log("AUTHENTICATION ERROR ----------------->",error)
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
}