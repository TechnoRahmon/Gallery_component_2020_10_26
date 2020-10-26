const  mongoose = require('mongoose')

var imgesSchema = mongoose.Schema({
    img_path : {type : String , require:true},
    caption : {type : String , require:true}
}); 



var Images = module.exports = mongoose.model('images', imgesSchema )

module.exports.get = (callback, limmit)=>{
    Images.find(callback).limit(limmit);
}

