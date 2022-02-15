const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const mongoose=require("mongoose");
const Item=require("./models/blogModel.js");



// variables
const port=80;
const app=express();



// database.
const mongodb="mongodb+srv://aabhash:aabhash123@cluster0.rgddj.mongodb.net/blogPracticeo?retryWrites=true&w=majority";
mongoose.connect(mongodb).then((result)=>{
    console.log("the database connected");
}).catch((error)=>{
    console.log("the database not connected");
})



//middleware.
app.use(bodyParser.urlencoded({extended:false}));


// template engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname+"/views"));


// controller

app.get("/",(request,response)=>{
    response.redirect("/show-blog");
    // response.render("index");
});

app.get("/show-blog",(request,response)=>{
    Item.find().sort({createdAt:-1}).then((result)=>{
        response.render("index",{items:result});
        // response.send(result);
    }).catch((error)=>{
        console.log("the response not sent");
    })
});
app.get("/blog",(request,response)=>{
    response.render("blogs");
})

app.post("/set-blog",(request,response)=>{
    const item=new Item(request.body);
    item.save().then((result)=>{
        response.redirect("/show-blog");
    }).catch((error)=>{
        console.log("the blog not able to set");
    })
})




// listening to the port

app.listen(port,(error)=>{
    if(error){
        console.log("server not started");
    }
    else{
        console.log("the server started");
    }
})
