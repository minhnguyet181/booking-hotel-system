import * as hotelService from '../services/hotelService.js';

export const addHotelController = async (req, res, next) => {
  try {
    const newHotel = await hotelService.addHotel(req.body);
    res.status(200).json(newHotel);
  } catch (error) {
    next(error);
  }
};

export const getHotelController = async (req, res, next) => {
  try {
    const hotel = await hotelService.getHotel(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const getAllHotelsController = async (req, res, next) => {
  try {
    const hotels = await hotelService.getAllHotels(req.query);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const updateHotelController = async (req, res, next) => {
  try {
    const updated = await hotelService.updateHotel(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteHotelController = async (req, res, next) => {
  try {
    await hotelService.deleteHotel(req.params.id);
    res.status(200).json("Hotel has been deleted successfully...");
  } catch (error) {
    next(error);
  }
};

export const countByCityController = async (req, res, next) => {
  try {
    const result = await hotelService.countByCity(req.query.cities);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const countByTypeController = async (req, res, next) => {
  try {
    const result = await hotelService.countByType();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getHotelRoomsController = async (req, res, next) => {
  try {
    const rooms = await hotelService.getHotelRooms(req.params.id);
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};