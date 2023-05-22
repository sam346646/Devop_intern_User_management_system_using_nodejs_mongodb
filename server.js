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

//log request
app.use(morgan('tiny'));

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set("view engine","ejs"); //similiar to html we are using ejs
//app.set("views",path.resolve(__dirname,"views/ejs"))-->if path of view is inside other folder install path module

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css"))); //path.resolve full path
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

app.get('/',(req,res)=>{     // '/' root
    // res.send("CRUD Application"); --> To display
    res.render("index"); //to render index.ejs in browser
});



app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});