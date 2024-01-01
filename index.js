//import express
const express=require("express");

//function to connect server to database via mongoose
const dbConnect = require("./config/dbConnection");

//import auth routes
const authRoutes=require("./routes/auth");

//import admin routes
const adminAuthRoutes=require("./routes/AdminAuth");

//import userRole routes
const userRoleRoutes=require("./routes/userRoles");

//import admin role routes
const adminRoleRoutes=require("./routes/adminRoles");

//function to connect server to cloudinary
const connectToCloudinary = require("./config/cloudinary");

//require dotenv to load environment variables
require("dotenv").config();

//define port
const port=process.env.PORT || 5000;

//database connection
 dbConnect().then(()=>{
   console.log("Successfully connected to db")
 }).catch((err)=>{
   console.log("Error in connecting to db",err);
   process.exit(1);
 })

 //initialize the server
const app=express();

//connection to cloudinary
connectToCloudinary().then(result => console.log(result)).catch(error => console.error(error))

//middleware to parse the request body from requests
app.use(express.json());

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/auth/admin",adminAuthRoutes);
app.use("/api/v1/user",userRoleRoutes);
app.use("/api/v1/admin",adminRoleRoutes);

//listening the port on a particular port
app.listen(port,(err)=>{
   if(err){
    throw err;
   }
   console.log(`Server running sucessfully on port ${port}`);
})

