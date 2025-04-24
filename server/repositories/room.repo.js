import Room from "../models/Room.js";

export const createRoom = async (roomData) => {
  try {
    const newRoom = new Room(roomData);
    return await newRoom.save();
  } catch (error) {
    throw error;
  }
};

export const getAllRooms = async () => {
  try {
    return await Room.find();
  } catch (error) {
    throw error;
  }
};

export const getRoomById = async (id) => {
  try {
    return await Room.findById(id);
  } catch (error) {
    throw error;
  }
};

export const updateRoom = async (id, roomData) => {
  try {
    return await Room.findByIdAndUpdate(id, roomData, { new: true });
  } catch (error) {
    throw error;
  }
};

export const deleteRoom = async (id) => {
  try {
    return await Room.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

export const getRoomsByFilter = async (filters) => {
  try {
    return await Room.find(filters);
  } catch (error) {
    throw error;
  }
};