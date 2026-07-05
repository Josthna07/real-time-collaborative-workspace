require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const connectDB = require("./backend/config/db");
const User = require("./backend/models/User");


const workspaceRoutes = require("./backend/routes/workspaceRoutes");
const boardRoutes = require("./backend/routes/boardRoutes");
(async () => {
  await connectDB();
  setTimeout(async () => {
  const users = await mongoose.connection.db
    .collection("users")
    .find({})
    .toArray();
}, 5000);
  console.log("Database:", mongoose.connection.name);

  const collections = await mongoose.connection.db.listCollections().toArray();

  const users = await mongoose.connection.db
    .collection("users")
    .find({})
    .toArray();
})();
const app = express();


app.use(express.json());

app.use("/api/workspaces", workspaceRoutes);
app.use("/api/boards", boardRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});