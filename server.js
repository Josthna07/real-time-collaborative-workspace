require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// Routes
const authRoutes = require("./backend/routes/authRoutes");
const workspaceRoutes = require("./backend/routes/workspaceRoutes");
const boardRoutes = require("./backend/routes/boardRoutes");
const commentRoutes = require("./backend/routes/commentRoutes");

// DB Connection
const connectDB = require("./backend/config/db");
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Middleware
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/comments", commentRoutes);

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
    io.emit("receiveNotification", {
      message: data.message,
      sender: data.sender,
      createdAt: new Date(),
    });
  });

  // Comment Event (REAL-TIME)
  socket.on("sendComment", (data) => {
    io.emit("receiveComment", {
      task: data.task,
      user: data.user,
      comment: data.comment,
      createdAt: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

// Server Port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});