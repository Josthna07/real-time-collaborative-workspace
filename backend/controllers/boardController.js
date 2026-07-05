const Board = require("../models/Board");


const createBoard = async(req,res)=>{

try{

const board = await Board.create({

name:req.body.name,

workspace:req.body.workspace,

createdBy:req.user.id

});

res.status(201).json(board);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};



const getBoards = async(req,res)=>{

try{

const boards = await Board.find({

workspace:req.params.workspaceId

});

res.json(boards);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};



module.exports={

createBoard,

getBoards

};