const express = require("express");

const {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
} = require("../controllers/boardController");

const router = express.Router();

router.post("/", createBoard);

router.get("/", getBoards);

router.get("/:id", getBoardById);

router.put("/:id", updateBoard);

router.delete("/:id", deleteBoard);

module.exports = router;