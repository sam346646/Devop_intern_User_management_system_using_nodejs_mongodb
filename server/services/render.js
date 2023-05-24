const axios=require('axios');  //To make API request

exports.homeRoutes=(req,res)=>{
    //To make a ge request to '/api/users'
    axios.get('http://localhost:3000/api/users')
    .then(response=>{
        res.render("index",{users:response.data});  //response have different property like data and method
    })
    .catch(err=>{
        res.send(err);
    })

    // res.send("CRUD Application"); --> To display
    // res.render("index",{users:"New data"}); //to render index.ejs in browser
}
exports.add_user=(req,res)=>{
    res.render("add-user"); 
}
exports.update_user=(req,res)=>{
    axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}})
    .then(data=>{
        res.render("update-user",{user:data.data});  //response have different property like data and method
    })
    .catch(err=>{
        res.send(err);
    })
}