import express from "express";
import * as roomController from "../controllers/room.controller.js";
import { verifyTokenMiddleware,checkRoleMiddleware } from "../middlewares/authMiddleware.js";
const roomRouter = express.Router();

roomRouter.get("/", roomController.getAllRooms);
roomRouter.get("/filter", roomController.getRoomsByFilter);
roomRouter.get("/:id", roomController.getRoomById);

// Admin-only routes
roomRouter.post("/", verifyTokenMiddleware, checkRoleMiddleware('admin'), roomController.createRoom);
roomRouter.put("/:id", verifyTokenMiddleware, checkRoleMiddleware('admin'), roomController.updateRoom);
roomRouter.delete("/:id", verifyTokenMiddleware, checkRoleMiddleware('admin'), roomController.deleteRoom);

export default roomRouter;