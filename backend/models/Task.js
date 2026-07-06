const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{

title:{
type:String,
required:true
},

description:{
type:String
},

board:{
type:mongoose.Schema.Types.ObjectId,
ref:"Board",
required:true
},

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

status:{
type:String,

enum:[

"Todo",

"In Progress",

"Done"

],

default:"Todo"

},

priority:{

type:String,

enum:[

"Low",

"Medium",

"High"

],

default:"Medium"

}

},
{

timestamps:true

}
);

module.exports = mongoose.model(

"Task",

taskSchema

);