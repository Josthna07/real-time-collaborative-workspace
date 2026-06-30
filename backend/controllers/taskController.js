const Task = require("../models/Task");


const createTask = async(req,res)=>{

try{

const task = await Task.create({

title:req.body.title,

description:req.body.description,

board:req.body.board,

priority:req.body.priority,

createdBy:req.user.id

});

res.status(201).json(task);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};



const getTasks = async(req,res)=>{

try{

const tasks = await Task.find({

board:req.params.boardId

});

res.json(tasks);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};



module.exports={

createTask,

getTasks

};