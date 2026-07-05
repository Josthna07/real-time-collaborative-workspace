const Workspace = require("../models/Workspace");
const Board = require("../models/Board");
const User = require("../models/User");
const mongoose = require("mongoose");
// Create Workspace
const createWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.create(req.body);

    res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Workspaces
const getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find()
      .populate("owner", "name email")
      .populate("members", "name email");

    res.status(200).json({
      success: true,
      workspaces,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Workspace By ID
const getWorkspaceById = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id)
      .populate("owner", "name email")
      .populate("members", "name email");

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    res.status(200).json({
      success: true,
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Workspace
const updateWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Workspace updated successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Workspace
const deleteWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findByIdAndDelete(req.params.id);
    await Board.deleteMany({
  workspace: req.params.id,
});
    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Workspace deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getWorkspaceBoards = async (req, res) => {

  try {

    const boards = await Board.find({
      workspace: req.params.id,
    });

    res.status(200).json({
      success: true,
      boards,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
const inviteMember = async (req, res) => {
  try {
    const { memberId } = req.body;
console.log("Received Member ID:", memberId);

const allUsers = await User.find();
console.log("All Users:", allUsers);

console.log("Database Name:", User.db.name);

const users = await User.find({});
console.log("Users in DB:", users);

console.log("Searching:", memberId);
console.log("Connected Database:", mongoose.connection.name);

console.log("Users:", users);

console.log("Searching Member ID:", memberId);
const user = await User.findById(memberId);

console.log("Found User:", user);
console.log("User Found:", user);
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }

    console.log("Received Member ID:", memberId);
console.log("User Found:", user);

if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found",
  });
}

    if (workspace.members.includes(memberId)) {
      return res.status(400).json({
        success: false,
        message: "User already exists in workspace",
      });
    }

    workspace.members.push(memberId);

    await workspace.save();

    res.status(200).json({
      success: true,
      message: "Member invited successfully",
      workspace,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  inviteMember,
  getWorkspaceBoards,
};const Workspace = require("../models/Workspace");

const createWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.create({
      name: req.body.name,
      owner: req.user.id,
      members: [req.user.id],
    });

    res.status(201).json(workspace);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getWorkspaces = async (req, res) => {
  try {

    const workspaces = await Workspace.find({
      members: req.user.id
    });

    res.json(workspaces);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


module.exports = {
  createWorkspace,
  getWorkspaces,
};