const express = require("express");

const {

createBoard,

getBoards

}=require("../controllers/boardController");


const {

protect

}=require("../middleware/authMiddleware");


const router = express.Router();


router.post(

"/",

protect,

createBoard

);


router.get(

"/:workspaceId",

protect,

getBoards

);


module.exports = router;