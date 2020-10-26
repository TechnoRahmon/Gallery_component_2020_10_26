const Images = require('./imagesModel')
const express = require('express')
var app = express()
app.set('veiw engine','pug')


exports.index= (req,res)=>{
    console.log('index');
          Images.get( (err,images)=>{
            
                if (err) {
                    res.josn({
                     status:"error",
                     message:err,
                    })
                }

                if (images.length >0){

                    var imgArr = []
                    images.forEach(element => {
                        imgArr.push({path :element.img_path, caption :element.caption})
                    });
                    //console.log(imgArr[1].caption);
    
                    res.render('index.pug',{ conDis:'none',imgs:imgArr})

                }else{
                    res.render('index.pug',{ conDis:'none',imgsMsg:'Gallery is empty'})
                }
             

        
          })
}


exports.new = (req,rsp)=>{
    //console.log(req.file);
 

        if (!req.file){
            // if the sended file is empty
            console.log('empty files '+req.file);
            Images.get( (err,images)=>{
                if (err) {
                    res.josn({
                    status:"error",
                    message:err,
                    })
                }

                var imgArr = []
                images.forEach(element => {
                    imgArr.push({path :element.img_path, caption :element.caption})
                });
                if (imgArr >0){
                    rsp.render('index.pug',{ msg:'block',imgs:imgArr})

                }else{
                    rsp.render('index.pug',{ msg:'block',imgsMsg:'Gallery is empty'})

                }

                
            })
        
        }else{
            // file is not empty
            var images = new Images() ; 
            images.img_path = req.file.filename;
            images.caption = req.body.caption
            
            
        
    
            images.save((er)=>{
                if(er) rsp.send('Error with saving images!')
                //console.log(imgArr[1].caption);
                Images.get( (err,images)=>{
                    if (err) {
                        res.josn({
                        status:"error",
                        message:err,
                        })
                    }

                    var imgArr = []
                    images.forEach(element => {
                        imgArr.push({path :element.img_path, caption :element.caption})
                    });
            
                    rsp.render('index.pug',{ conDis:'block',imgs:imgArr})
    
                    
                })
            })
        } 

}