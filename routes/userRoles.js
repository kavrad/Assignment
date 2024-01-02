//import express
const express=require("express");

const { isLoggedIn, isUser } = require("../middleware/auth");

const { getUserDetails, modifyUserDetails, deleteAccount } = require("../controllers/userRoles");

//middleware to upload images via multer
const upload = require("../middleware/multer");

const router=express.Router();

//GET Request to get his/her user information
router.get("/user-details",isLoggedIn,isUser,getUserDetails);

//PATCH request to update his/her details 
router.patch("/update-user",isLoggedIn,isUser,upload.single("profileImage"),modifyUserDetails);

// DELETE Request to delete his/her account
router.delete("/delete-account",isLoggedIn,isUser,deleteAccount);

module.exports=router;