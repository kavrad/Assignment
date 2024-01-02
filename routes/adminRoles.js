//import express
const express=require("express");

const { isLoggedIn,  isAdmin } = require("../middleware/auth");

const { getAllUsersDetails, updateUser, deleteUser, deleteAllUsers } = require("../controllers/adminRoles");


const router=express.Router();

//GET request to get all yser details
router.get("/all-user-details",isLoggedIn,isAdmin,getAllUsersDetails);

//PUT request to modify a user info
router.put("/update-user",isLoggedIn,isAdmin,updateUser)

//DELETE request to delete a particular user 
router.delete("/delete-user/:userId",isLoggedIn,isAdmin,deleteUser);

//DELETE request to delete all users 
router.delete("/delete-all-users",isLoggedIn,isAdmin,deleteAllUsers);

module.exports=router;