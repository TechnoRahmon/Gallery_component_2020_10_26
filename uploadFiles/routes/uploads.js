var express = require('express');
var router = express.Router();
var imagesController = require('../imagesConroller')

var app = express(); 
const multer = require('multer')




app.set('veiw engine','pug')

//set storge 
var storage = multer.diskStorage({
  destination:(req,file,cb)=>{ // destination dir
    cb(null,'./public/images')},
    
  filename: (req,file,cb)=>{ // file name
    cb(null,file.originalname)}
})

//file filter 
 const filefilter = (req,file,cb)=>{console.log(file);
 if( file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'|| file.mimetype == 'image/jpg'|| file.mimetype == 'image/gif'){
   cb(null,true)
 }else{
   cb(null,false)
 }
 }

//uploading single file 
var upload = multer({
  storage:storage ,
  fileFilter:filefilter
})

/* GET users listing.     imagesController.new */
router.post('/',upload.single('file') ,imagesController.new);

module.exports = router;
