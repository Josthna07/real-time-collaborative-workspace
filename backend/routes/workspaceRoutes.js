const express = require("express");

const {
  createWorkspace,
  getWorkspaces,
} = require("../controllers/workspaceController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createWorkspace);
router.get("/", protect, getWorkspaces);

module.exports = router;