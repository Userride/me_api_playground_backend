import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./db.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*" }));

// This route remains at the root level for simple health checks.
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

// --- CORRECTED LINE ---
// All routes from your 'routes/index.js' file will now start with /api.
// e.g., /profile becomes /api/profile
app.use("/api", router);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });