import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./db.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*" }));

// Health check route (for Render, very useful)
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

// Your main API routes
app.use("/api", router);

// Default route (so Render root URL doesn’t 404)
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});

// Port setup
const PORT = process.env.PORT || 5000;

// DB + Server start
connectDB(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });
