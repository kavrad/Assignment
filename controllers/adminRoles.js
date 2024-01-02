//import User model
const User = require("../models/User")
const imageUploader = require("../utils/imageUploader")

//controller to get all the user details by admin
exports.getAllUsersDetails=async (req,res)=>{
    try {
        //fetch all the users info who has a role 'User' only 
        const allUsers=await User.find({
            _id:{
                $ne:req.user._id,
            },
            accountType:{
                $ne:req.user.accountType
            }
        })
        
        console.log("ALL USERS FETCHED SUCCESSFULLY ----------->",allUsers)
        
        return allUsers.length !==0 ? res.status(200).json({
            success:true,
            message:"Suessfully fetched all the users!!",
            data:allUsers
        }) : res.json({
            success:false,
            message:"No users found other than you"
        })

    } catch (error) {
        console.log("Error in fetching all the users");
        console.error("ALL USERS FETCH ERROR ----------------------",error);
        res.status(500).json({
            success:false,
            message: "Something went wrong while fetching all users info"
        })
    }
}

//controller to update a user detail by admin
exports.updateUser=async (req,res)=>{
    try {
        //extract the userId and name of the user to be updated from req.body
        const {userId,name}=req.body;

        //if any of the fields are not provided then return a response
        if(!userId || !name || req.file){
            return res.status(400).json({
                success:false,
                message:"Please provide all empty fields!!"
            })
        }

        //find if this is a valid user or not
        const user=await User.findById(userId);
         
        //if not a valid user then return a response
        if(!user){
            return res.status(404).json({
                success:false,
                message:"No such user found!!"
            })
        }
        
        const imageUrl=await imageUploader(req.file);

        //If a valid user then update that user in users collection
            const updateUser=await User.findOneAndUpdate({
               $and:[{
                _id:userId
               },{
                accountType:{
                    $ne:req.user.accountType
                }
               }]

            },{
              $set:{
                name,
                image:imageUrl.secure_url 
              }
            },{
                new:true
            })

            return res.status(200).json({
                success:true,
                message:`Sucessfully updated user`,
                data:updateUser
            })
        

    }catch(err){
       console.log("Error in updating the user");
       console.error("USER UPDATE ERROR ****************************",err);
       res.status(500).json({
        success:false,
        message:"Something went wrong while updating user info"
       })

    }
}

//controller to delete a single user account
exports.deleteUser=async (req,res) =>{
    try {
        //extract userId from req.params
        const {userId}=req.params;

        //if userId is not provided the return a response
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"Please provide the user to be deleted!!"
            })
        }

        //check if he is a valid user or not
        const user=await User.findById(userId);

        //if not found return a response
        if(!user){
            return res.status(404).json({
                success:false,
                message:"No user found!!"
            })
        }
        
        //Otherwise delete user from users collection
        const deleteUser=await User.deleteOne({
            _id:userId,
            accountType:{
                $ne:req.user.accountType
            }
        })

        res.status(200).json({
            success:true,
            message:"Sucessfully deleted the user!!"
        })
        
    } catch (error) {
        console.log("Error in deleting the user");
        console.error("DELETE A PARTICULAR USER ERROR ---------------------",error);
        res.status(500).json({
            success:false,
            message:"Soething went wrong while deleting this user!!"
        })
    }
}

//controller to delete all users from db
exports.deleteAllUsers=async (req,res) => {
    try {
        const users=await User.find({
            accountType:{
                $ne:req.user.accountType
            }
        })

        if(users.length === 0){
            return res.json({
                success:false,
                message:"No users are there to delete!!"
            })
        }
        
        const deleteAllUsers = await User.deleteMany({
            accountType:{
                $ne:req.user.accountType
            }
        })

        res.status(200).json({
            success:true,
            message:"Sucessfully deleted all the user"
        })

    } catch (error) {

        console.log("Error in deleting all the users");
        console.error("DELETE ALL THE USERS ERROR ------------------",error);
        res.status(500).json({
            success:false,
            message: "Error in deleting all users account"
        })

    }
}

