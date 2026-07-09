const Notification = require("../models/notification");


// Create Notification
const createNotification = async (req, res) => {
  try {

    const notification = await Notification.create(req.body);


    const populatedNotification = await Notification.findById(
      notification._id
    ).populate(
      "user",
      "name email"
    );


    // Real-time notification using Socket.IO
    if (req.io) {
      req.io.emit(
        "receiveNotification",
        populatedNotification
      );
    }


    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification: populatedNotification,
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
      .populate(
        "user",
        "name email"
      )
      .sort({
        createdAt: -1,
      });


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