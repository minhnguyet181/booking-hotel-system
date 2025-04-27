import express from "express";
import * as roomController from "../controllers/room.controller.js";

const roomRouter = express.Router();

roomRouter.post("/", roomController.createRoom);

roomRouter.get("/", roomController.getAllRooms);

roomRouter.get("/filter", roomController.getRoomsByFilter);

roomRouter.get("/:id", roomController.getRoomById);

roomRouter.put("/:id", roomController.updateRoom);
roomRouter.delete("/:id", roomController.deleteRoom);

export default roomRouter;