require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

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
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Create HTTP Server
const server = http.createServer(app);


// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ],
    credentials: true,
  },
});


// Make Socket available everywhere
global.io = io;


// Make Socket available in controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});


// API Routes
app.use("/api/auth", authRoutes);

app.use("/api/workspaces", workspaceRoutes);

app.use("/api/boards", boardRoutes);

app.use("/api/comments", commentRoutes);

app.use("/api/notifications", notificationRoutes);


// Home Route
app.get("/", (req, res) => {
  res.send(
    "Real-Time Collaborative Workspace Backend Running..."
  );
});


// Socket Events
io.on("connection", (socket) => {

  console.log(
    "User Connected:",
    socket.id
  );


  // Join task room
  socket.on("joinTask", (taskId) => {

    socket.join(taskId);

    console.log(
      `User joined task: ${taskId}`
    );

  });


  // Realtime comments
  socket.on("sendComment", (data) => {

    io.emit(
      "receiveComment",
      data
    );

  });


  // Realtime notifications
  socket.on("sendNotification", (data) => {

    io.emit(
      "receiveNotification",
      data
    );

  });


  socket.on("disconnect", () => {

    console.log(
      "User Disconnected:",
      socket.id
    );

  });

});


// Server Start
const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});