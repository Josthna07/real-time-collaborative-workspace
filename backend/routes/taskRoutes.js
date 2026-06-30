const express = require("express");

const {

createTask,

getTasks

}=require(

"../controllers/taskController"

);

const {

protect

}=require(

"../middleware/authMiddleware"

);


const router = express.Router();


router.post(

"/",

protect,

createTask

);


router.get(

"/:boardId",

protect,

getTasks

);


module.exports = router;