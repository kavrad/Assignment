//require multer to upload images
const multer=require("multer");

//define storage to store the images
const storage=multer.memoryStorage()

const upload=multer({
    storage,
})





module.exports=upload;