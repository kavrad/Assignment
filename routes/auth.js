//import express
const express=require("express");

//call Router method of express module
const router=express.Router();

const {signup,login}=require("../controllers/auth");

//middleware to upload user images via multer
const upload = require("../middleware/multer");

//POST request to create user account
router.post("/signup",upload.single("profileImage"),signup);

//POST request to implement login feature for user 
router.post("/login",login)

module.exports=router;