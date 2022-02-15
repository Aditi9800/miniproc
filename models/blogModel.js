const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const itemSchema=new Schema({
    title:{
type:String,
required:true,
    },
subject:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true,
},
jobtype:{
type:String
},
company:{
    type:String,
   
},
fulltime:{
    type:String,
   
},
intern:{
    type:String,
  
},
headline:{
    type:String,
    
},
newshead:{
    type:String,
   
},
news:{
    type:String,
  
},
updatehead:{
type:String,

},
updatesub:{
    type:String
},
updatedes:{
    type:String
},
ads:{
    type:String
},
link:{
    type:String
},




},{timestamps:true});

const Item=mongoose.model("Item",itemSchema);

module.exports=Item;