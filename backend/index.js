import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import { errorHandler, routeNotFound } from "./middlewares/errorHandler.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";
const PORT = process.env.PORT || 5000;
dotenv.config();
dbConnection();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(morgan("dev"));

// Serve uploaded task assets as static files, e.g.
// http://localhost:8800/uploads/1234-567.jpg
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api", routes);
app.use(routeNotFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
