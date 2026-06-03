require("dotenv").config();

const express = require("express");
const connectDB = require("./backend/config/db");

connectDB();

const app = express();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});