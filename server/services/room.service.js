import * as roomRepo from "../repositories/room.repo.js";

export const createRoom = async (roomData) => {
  try {
    return await roomRepo.createRoom(roomData);
  } catch (error) {
    throw error;
  }
};

export const getAllRooms = async () => {
  try {
    return await roomRepo.getAllRooms();
  } catch (error) {
    throw error;
  }
};

export const getRoomById = async (id) => {
  try {
    const room = await roomRepo.getRoomById(id);
    if (!room) {
      throw new Error("Không tìm thấy phòng");
    }
    return room;
  } catch (error) {
    throw error;
  }
};

export const updateRoom = async (id, roomData) => {
  try {
    const room = await roomRepo.updateRoom(id, roomData);
    if (!room) {
      throw new Error("Không tìm thấy phòng");
    }
    return room;
  } catch (error) {
    throw error;
  }
};

export const deleteRoom = async (id) => {
  try {
    const room = await roomRepo.deleteRoom(id);
    if (!room) {
      throw new Error("Không tìm thấy phòng");
    }
    return room;
  } catch (error) {
    throw error;
  }
};

export const getRoomsByFilter = async (filters) => {
  try {
    return await roomRepo.getRoomsByFilter(filters);
  } catch (error) {
    throw error;
  }
};