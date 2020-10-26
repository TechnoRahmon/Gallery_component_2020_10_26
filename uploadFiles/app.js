var express = require('express');
var path = require('path');
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const PORT = 3000
require('pug')


var indexRouter = require('./routes/index');
var uploadRouter = require('./routes/uploads');

var app = express();

// view engine setup

app.set('view engine', 'pug');

//bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//static file !!
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', indexRouter);
app.use('/upload', uploadRouter);
/******************************************************** */






/************************DataBase connection******************************** */
mongoose.connect('mongodb+srv://dbAdmin:108400@cluster1.tzijx.gcp.mongodb.net/gallery?retryWrites=true&w=majority',{useNewUrlParser: true ,useUnifiedTopology: true },(er)=>{
  if(er) {throw er}
  console.log('DB is connected !');
})

var db = mongoose.connection;

/******************************************************** */
app.listen(PORT,()=>{
  console.log('sever running at port :'+PORT);
});

/******************************************************** */

module.exports = app;
