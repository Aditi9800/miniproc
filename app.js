const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const mongoose=require("mongoose");
const Item=require("./models/blogModel.js");
const { response } = require("express");
const methodOverride=require("method-override");
const {v4:uuid}=require("uuid");
let comments=require("./sampleComments.js");

// variables
const port=process.env.PORT ||  80 ;
// const port=80;
const app=express();



// database.
const mongodb="mongodb+srv://aabhash:aabhash123@cluster0.rgddj.mongodb.net/jobsFair?retryWrites=true&w=majority";
mongoose.connect(mongodb).then((result)=>{
    console.log("the database connected");
}).catch((error)=>{
    console.log(error);
})



//middleware.
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride("_method"));

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
        response.render("index",{items:result, comments});
        // response.send(result);
    }).catch((error)=>{
        console.log("the response not sent");
    })
});




app.get("/key=blogadadsfadshfalddlfasdjflalksdjf/hellNodfasdfsdasdfasdf/log/aaaassdfdfasdflksdfasdfasdfdfasdfasdfj/fasdf",(request,response)=>{
    // response.redirect("/loginsPage");
    response.render("blogs");
})
 

app.post("/set-blog",(request,response)=>{
    const item=new Item(request.body);
    item.save().then((result)=>{
       
        response.redirect("/show-blog");
    }).catch((error)=>{
        console.log(error);
    })
});

app.get("/items/:id",(request,response)=>{
   
    const id=request.params.id;
    Item.findById(id).then((result)=>{
        response.render("item-detail",{item:result});
    }).catch((error)=>{
        console.log(error);
    })
})
app.get("/itemsnews/:id",(request,response)=>{
   
    const id=request.params.id;
    Item.findById(id).then((result)=>{
        response.render("news-item",{item:result});
    }).catch((error)=>{
        console.log(error);
    })
})





app.delete("/items/:id",(request,response)=>{
    const id=request.params.id;
    Item.findByIdAndDelete(id).then((result)=>{
       response.redirect("/show-blog");
    }).catch((error)=>{
        console.log(error);
    })
    
})

// app.get("/loginsPage",(request,response)=>{
//     response.render("loginPage");
// })
// app.post("/login",(request,response)=>{
//     const userName="ideapad";
//     const password="lenovo";
//    if(request.body.userName==userName && request.body.password==password){
//        response.redirect("/key=blogadadsfadshfalddlfasdjflalksdjf/hellNodfasdfsdasdfasdf/log/aaaassdfdfasdflksdfasdfasdfdfasdfasdfj/fasdf");
//    }
//    else{
//     response.render("404error");
//    }
// })


app.get("/set-blog",(request,response)=>{
    Item.find().then((result)=>{
        response.render("set-blog",{item:result});
    }).catch((error)=>{
        console.log(error);
    })

//   response.render("index",{item:})  
});

app.post("/set-blog",(request,response)=>{
    const item=new Item(request.body);
    item.save().then((result)=>{
       
        response.redirect("/show-blog");
    }).catch((error)=>{
        console.log(error);
    })

    

});


// comment System.


app.get("/comments/new",(request,response)=>{

    response.render("adminComment");
});
app.post("/comments",(request,response)=>{
    const {username,comment}=request.body;
    comments.push({username,comment,id:uuid()});
    response.redirect("/show-blog");
});


app.post("/show-blog",(request,response)=>{
    const {username,comment}=request.body;
    comments.push({username,comment,id:uuid()});
    response.redirect("/show-blog");
});


app.get("/adminSide/953f2aeb-6b36-439c-bca8-2f2717058887/211-953f2aeb-6b36-439c-bca8-2f2717058887/admin",(request,response)=>{
    response.render("indexForAdmin",{comments});
});


app.get("/adminSide/953f2aeb-6b36-439c-bca8-2f2717058887/211-953f2aeb-6b36-439c-bca8-2f2717058887/admin/:id",(request,response)=>{
    const {id}=request.params;
    let comment=comments.find(c=>c.id===id);
    response.render("details",{comment});
    });
    
    app.get("/adminSide/953f2aeb-6b36-439c-bca8-2f2717058887/211-953f2aeb-6b36-439c-bca8-2f2717058887/admin/:id/edit",(request,response)=>{
        const {id}=request.params;
        let comment=comments.find(c=>c.id===id);
        response.render("edit",{comment});
    })
    app.patch("/adminSide/953f2aeb-6b36-439c-bca8-2f2717058887/211-953f2aeb-6b36-439c-bca8-2f2717058887/admin/:id",(request,response)=>{// updating the comment
        const {id}=request.params;
        const commentUpdate=request.body.comment;
        const comment=comments.find(c=>c.id===id);
        comment.comment=commentUpdate;
        response.redirect("/adminSide/953f2aeb-6b36-439c-bca8-2f2717058887/211-953f2aeb-6b36-439c-bca8-2f2717058887/admin");
    });
    app.delete("/adminSide/953f2aeb-6b36-439c-bca8-2f2717058887/211-953f2aeb-6b36-439c-bca8-2f2717058887/admin/:id",(request,response)=>{
        const {id}=request.params;
        comments=comments.filter(c=>c.id !== id);
        response.redirect("/adminSide/953f2aeb-6b36-439c-bca8-2f2717058887/211-953f2aeb-6b36-439c-bca8-2f2717058887/admin");
    })





app.get("/about",(request,response)=>{
    response.render("aboutPage");
})



// weather api code
    var items=["TCS","Infosys","STEP Microsoft Internship"];
    app.get("/listji",function(req,res){
        let today=new Date();
         let options={
             weekday:"long",
             month:"long",
             day:"numeric",
             year:"numeric"
         }
         let day=today.toLocaleDateString("en-US",options);
        /*var day="";
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        day=days[today.getDate()+1];*/
       /* if(today.getDate()===0||today.getDate()===6){
            
        res.render("list",{kindofday:day});
         } else{*/
            res.render("list",{kindofday:day,newListItem:items});
        
    });


    app.post("/listji",function(req,res){
        item=req.body.newItem;
        items.push(item);
        res.redirect("/");
    
    })

// weather api code end





app.use((request,response)=>{
    response.render("404error");
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



// some security code.
//  <a href="/" class="btn btn-primary" id="deleteBtn" data-id="<%= item._id%>">delete</a> 


// deleteBtn.onclick=()=>{
//     const id=deleteBtn.dataset.id;
//     console.log(id);
//     const endpoint=`/items/${id}`;
//     fetch(endpoint,{
//         method:'DELETE'
//     }).then((result)=>{

//     }).catch((error)=>{
//         console.log("not deleted");
//     })
// }



{/* <div class="blog-post">
       <a href="/items/<%= item._id%>"> <h2 class="blog-post-title">Title : <%= item.title%></h2>
        <p class="blog-post-meta">Subject : <%= item.subject%> </p></a>


        <hr>
        </div>  */}


        // <!-- <% if(items.length>0){%>
        //     <% items.forEach(item => {%> -->


    //     <!-- <%  });%>
    //     <%  } else{%>
    //      <tr>
    //        <td>No data</td>
    //        <td>No data</td>
    //        <td>No data</td>
    //      </tr>
    //     <%  }%>
    //   -->


    // /itemsnews/<%= item._id%>






    // </pre>

    // <pre class="blog-post-meta" id="newsHead" style="color:grey;text-align:left;word-wrap: break-word;">