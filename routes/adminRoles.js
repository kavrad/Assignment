const express=require("express");
const { isLoggedIn, isUser, isAdmin } = require("../middleware/auth");
const { getAllUsersDetails, updateUser, deleteUser, deleteAllUsers } = require("../controllers/adminRoles");


const router=express.Router();

router.get("/all-user-details",isLoggedIn,isAdmin,getAllUsersDetails);

router.put("/update-user",isLoggedIn,isAdmin,updateUser)

router.delete("/delete-user/:userId",isLoggedIn,isAdmin,deleteUser);

router.delete("/delete-all-users",isLoggedIn,isAdmin,deleteAllUsers);

module.exports=router;