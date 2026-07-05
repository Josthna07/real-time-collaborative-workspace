const Board = require("../models/Board");
const Workspace = require("../models/Workspace");

// Create Board
const createBoard = async (req, res) => {
  try {
    const { title, workspace, createdBy } = req.body;

    // Check if workspace exists
    const workspaceExists = await Workspace.findById(workspace);

    if (!workspaceExists) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
    }
    if (!title || !workspace || !createdBy) {
  return res.status(400).json({
    success: false,
    message: "All fields are required",
  });
}
    const board = await Board.create({
      title,
      workspace,
      createdBy,
    });

    res.status(201).json({
      success: true,
      message: "Board created successfully",
      board,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Boards
const getBoards = async (req, res) => {
  try {
    const boards = await Board.find()
      .populate("workspace", "name")
      .populate("createdBy", "name email");

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

// Get Board By ID
const getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate("workspace", "name")
      .populate("createdBy", "name email");

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Board not found",
      });
    }

    res.status(200).json({
      success: true,
      board,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Board
const updateBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Board not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Board updated successfully",
      board,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Board
const deleteBoard = async (req, res) => {
  try {

    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Board not found",
      });
    }

    await board.deleteOne();

    res.status(200).json({
      success: true,
      message: "Board deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
};