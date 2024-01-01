//import bcrypt to hash passwords
const bcrypt=require("bcrypt");

//function to generate hashed passwords using bcrypt
const generatePassword=(password)=>{
   return new Promise((res,rej)=>{
    try {
        const hash=bcrypt.hash(password,10);
        res(hash)
    } catch (error) {
        console.error("Error in hashing the password");
        console.log("PASSWORD HASING ERROR..............",error);
        rej(error)
    }
    
   })
}

//function to compare the password given by user and password stored in db
const comparePasswords= async (hashedPassword,password)=>{
    return await bcrypt.compare(password,hashedPassword) ? true :false
}

module.exports={
    generatePassword,
    comparePasswords
};