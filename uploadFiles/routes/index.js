var express = require('express');
var router = express.Router();
var ImgController = require('../imagesConroller')



/* GET home page. */
router.get('/',ImgController.index);



module.exports = router;
