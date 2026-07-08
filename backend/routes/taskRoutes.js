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
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/create", upload.array("assets", 10), createTask);
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);
router.post("/activity/:id", protectRoute, postTaskActivity);

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", getTasks);
router.get("/:id", getTask);

router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);
router.put(
  "/update/:id",
  protectRoute,
  isAdminRoute,
  upload.array("assets", 10),
  updateTask,
);
router.put("/:id", trashTask);

router.delete("/delete-restore", deleteRestoreTask);

router.delete("/delete-restore/:id", deleteRestoreTask);

export default router;
