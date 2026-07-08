const express = require("express");
const {
  createComment,
  getComments,
} = require("../controllers/commentController");

const router = express.Router();

// Create comment
router.post("/", createComment);

// Get comments by task
router.get("/:taskId", getComments);

module.exports = router;