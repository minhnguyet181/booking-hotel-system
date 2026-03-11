import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import bookingRouter from "./routes/booking.route.js";
import userRouter from "./routes/user.route.js";
import hotelRouter from "./routes/hotel.route.js";
import roomRouter from "./routes/room.route.js";
import activityRouter from "./routes/activity.route.js";
import notiRouter from "./routes/notification.route.js";
import { initializeSocket } from "./socket/socketServer.js";
dotenv.config();
const app = express();
const server = createServer(app);

app.use(cors(
  {
    origin: 'http://localhost:5173', // frontend Vite
    credentials: true
  }
));
app.use(express.json());
app.use("/users", userRouter);
app.use("/hotel",hotelRouter);
app.use("/rooms",roomRouter);
app.use("/activities", activityRouter);
app.use("/booking", bookingRouter);
app.use("/notifications",notiRouter);

// Initialize Socket.io
const io = initializeSocket(server);

// Export io để sử dụng trong các service khác
export { io };

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("❌ DB connection error", err));
