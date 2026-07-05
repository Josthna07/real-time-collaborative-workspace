require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./backend/config/db");
const authRoutes = require("./backend/routes/authRoutes");


const workspaceRoutes = require("./backend/routes/workspaceRoutes");
const boardRoutes = require("./backend/routes/boardRoutes");
