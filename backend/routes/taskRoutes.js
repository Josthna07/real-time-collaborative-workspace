const express = require("express");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

// Create Task
router.post("/", createTask);

// Get All Tasks
router.get("/", getTasks);

// Get Task By ID
router.get("/:id", getTaskById);

// Update Task
router.put("/:id", updateTask);

// Delete Task
router.delete("/:id", deleteTask);

module.exports = router;