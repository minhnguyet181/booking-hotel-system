import * as roomService from "../services/room.service.js";

export const createRoom = async (req, res) => {
  try {
    const room = await roomService.createRoom(req.body);
    res.status(201).json({
      success: true,
      data: room,
      message: "Tạo phòng thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.status(200).json({
      success: true,
      data: rooms,
      message: "Lấy danh sách phòng thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const room = await roomService.getRoomById(req.params.id);
    res.status(200).json({
      success: true,
      data: room,
      message: "Lấy thông tin phòng thành công",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const room = await roomService.updateRoom(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: room,
      message: "Cập nhật thông tin phòng thành công",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    await roomService.deleteRoom(req.params.id);
    res.status(200).json({
      success: true,
      message: "Xóa phòng thành công",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRoomsByFilter = async (req, res) => {
  try {
    const filters = req.query;
    const rooms = await roomService.getRoomsByFilter(filters);
    res.status(200).json({
      success: true,
      data: rooms,
      message: "Lấy danh sách phòng theo bộ lọc thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};