require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./backend/config/db");

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
  res.send("Real-Time Collaborative Workspace Backend Running...");
});

// Create HTTP Server
const server = http.createServer(app);

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket Connection
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // Notification Event
  socket.on("sendNotification", (data) => {
    console.log("Notification:", data);

    io.emit("receiveNotification", {
      message: data.message,
      sender: data.sender,
      createdAt: new Date(),
    });
  });

  // Comment Event
  socket.on("sendComment", (data) => {
    console.log("Comment:", data);

    io.emit("receiveComment", {
      comment: data.comment,
      user: data.user,
      createdAt: new Date(),
    });
  });

  // Disconnect Event
  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

// Server Port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});