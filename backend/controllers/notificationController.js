const Notification = require("../models/Notification");

// Create Notification
const createNotification = async (req, res) => {
  try {

    const notification = await Notification.create(req.body);

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Notifications
const getNotifications = async (req, res) => {
  try {

    const notifications = await Notification.find()
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      notifications,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createNotification,
  getNotifications,
};