//import express
const express=require("express");

//import controllers
const { signup, login } = require("../controllers/AdminAuth");

const upload = require("../middleware/multer");

const router=express.Router();

//POST request to create admin accounts
router.post("/signup",upload.single("profileImage"),signup);

//POST request to implement login feature for admin 
router.post("/login",login);

module.exports=router;