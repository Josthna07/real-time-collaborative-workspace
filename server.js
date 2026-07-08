require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// Database
const connectDB = require("./backend/config/db");

// Routes
const authRoutes = require("./backend/routes/authRoutes");
const workspaceRoutes = require("./backend/routes/workspaceRoutes");
const boardRoutes = require("./backend/routes/boardRoutes");
const commentRoutes = require("./backend/routes/commentRoutes");
const notificationRoutes = require("./backend/routes/notificationRoutes");

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Real-Time Collaborative Workspace Backend Running...");
});

// Create HTTP Server
const server = http.createServer(app);

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Socket Events
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // Real-Time Comment
  socket.on("sendComment", (data) => {
    console.log("New Comment:", data);

    io.emit("receiveComment", {
      task: data.task,
      user: data.user,
      comment: data.comment,
      createdAt: new Date(),
    });
  });

  // Real-Time Notification
  socket.on("sendNotification", (data) => {
    console.log("New Notification:", data);

    io.emit("receiveNotification", {
      user: data.user,
      message: data.message,
      createdAt: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});