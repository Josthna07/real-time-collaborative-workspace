import express from "express";
import {
  createSubTask,
  createTask,
  dashboardStatistics,
  deleteRestoreTask,
  duplicateTask,
  getTask,
  getTasks,
  postTaskActivity,
  trashTask,
  updateTask,
} from "../controllers/taskController.js";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddlewave.js";

const router = express.Router();

router.post("/create", createTask);
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);
router.post("/activity/:id", protectRoute, postTaskActivity);

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", getTasks);
router.get("/:id", getTask);

router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);
router.put("/update/:id", protectRoute, isAdminRoute, updateTask);
router.put("/:id", trashTask);

router.delete("/delete-restore", deleteRestoreTask);

router.delete("/delete-restore/:id", deleteRestoreTask);

export default router;

const express = require("express");

const {
  createTask,

  getTasks,

  updateTask,

  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",

  protect,

  createTask,
);

router.get(
  "/:boardId",

  protect,

  getTasks,
);

router.put(
  "/:id",

  protect,

  updateTask,
);

router.delete(
  "/:id",

  protect,

  deleteTask,
);

module.exports = router;
