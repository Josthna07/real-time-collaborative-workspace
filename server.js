require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./backend/config/db");
const authRoutes = require("./backend/routes/authRoutes");

connectDB();
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

const testRoutes = require("./backend/routes/testRoutes");
app.use("/api/test", testRoutes);

const workspaceRoutes = require("./backend/routes/workspaceRoutes");
app.use("/api/workspaces", workspaceRoutes);

const boardRoutes = require("./backend/routes/boardRoutes");
app.use("/api/workspaces",workspaceRoutes);
app.use("/api/boards",boardRoutes);

const taskRoutes =require("./backend/routes/taskRoutes");
app.use("/api/tasks",taskRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {

  console.log("User Connected:", socket.id);

  socket.on("joinWorkspace", (workspaceId) => {

    socket.join(workspaceId);

    console.log(
      "Joined Workspace:",
      workspaceId
    );

  });

  socket.on("taskUpdated", (data) => {

    socket.to(data.workspaceId).emit(

      "taskChanged",

      data

    );

  });

  socket.on("disconnect", () => {

    console.log(

      "User Disconnected"

    );

  });

});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});