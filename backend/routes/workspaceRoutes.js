const express = require("express");

const {
  createWorkspace,
  getWorkspaces,
  getWorkspaceBoards,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  inviteMember,
} = require("../controllers/workspaceController");

console.log({
  createWorkspace,
  getWorkspaces,
  getWorkspaceBoards,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  inviteMember
});

const router = express.Router();

// Create Workspace
router.post("/", createWorkspace);

// Get All Workspaces
router.get("/", getWorkspaces);

// Get Workspace By ID
router.get("/:id", getWorkspaceById);

// Update Workspace
router.put("/:id", updateWorkspace);

// Delete Workspace
router.delete("/:id", deleteWorkspace);

// Invite Member
router.put("/:id/invite", inviteMember);
router.get("/:id/boards", getWorkspaceBoards);

module.exports = router;