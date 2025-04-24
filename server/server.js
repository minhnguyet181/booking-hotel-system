import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import roomRoutes from "./routes/room.route.js";
dotenv.config();
const app = express();
app.use(cors(
  {
    origin: 'http://localhost:5173', // frontend Vite
    credentials: true
  }
));
app.use(express.json());
// Đăng ký routes
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("❌ DB connection error", err));
