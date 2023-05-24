//npm i express morgan nodemon ejs body-parser dotenv mongoose axios
//npm start -->To start nodemon and change start:nodemon server in package.json

const express=require('express');
const app=express();
const dotenv=require('dotenv');
const path=require('path');
const morgan=require('morgan'); //alllows us to log a request whenever we make request
const bodyparser=require("body-parser");

dotenv.config({path:'config.env'});
const PORT=process.env.PORT||8080;
const connectdb=require('./server/database/connection');

//log request
app.use(morgan('tiny'));

//mongodb connection
connectdb();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set("view engine","ejs"); //similiar to html we are using ejs
//app.set("views",path.resolve(__dirname,"views/ejs"))-->if path of view is inside other folder install path module

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css"))); //path.resolve full path
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

//load differnt router
app.use('/',require('./server/routes/router')); //need to specify the last file also

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});