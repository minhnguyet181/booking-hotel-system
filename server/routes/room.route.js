import express from "express";
import * as roomController from "../controllers/room.controller.js";

const router = express.Router();

// Tạo phòng mới
router.post("/", roomController.createRoom);

// Lấy tất cả phòng
router.get("/", roomController.getAllRooms);

// Lấy phòng theo bộ lọc
router.get("/filter", roomController.getRoomsByFilter);

// Lấy phòng theo ID
router.get("/:id", roomController.getRoomById);

// Cập nhật thông tin phòng
router.put("/:id", roomController.updateRoom);

// Xóa phòng
router.delete("/:id", roomController.deleteRoom);

export default router;