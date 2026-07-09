const express = require("express");

const {
  createComment,
  getComments,
} = require("../controllers/commentController");

const router = express.Router();


// =====================================
// COMMENT ROUTES
// =====================================


// Create a new comment
// POST /api/comments
router.post("/", createComment);


// Get all comments of a task
// GET /api/comments/:taskId
router.get("/:taskId", getComments);


module.exports = router;