//import mongoose
const mongoose = require("mongoose");

//import dotenv to load environment variables
require("dotenv").config();

//function to connect to db via mongoose
const dbConnect=()=>{
   return new Promise((res,rej)=>{
    try {
        const result=mongoose.connect(process.env.DB_URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        res(result);
        
    } catch (error) {
        rej(error);
        
    }
   })
}

module.exports = dbConnect