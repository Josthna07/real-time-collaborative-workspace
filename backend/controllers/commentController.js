const Comment = require("../models/comment");

// Create Comment
const createComment = async (req, res) => {
  try {
    const { task, user, comment } = req.body;

    if (!task || !user || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newComment = await Comment.create({
      task,
      user,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Comments for a Task
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      task: req.params.taskId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createComment,
  getComments,
};