import * as hotelService from '../services/hotelService.js';

export const getHotelInfoController = async (req, res, next) => {
  try {
    const hotel = await hotelService.getHotelInfo();
    res.status(200).json({
      success: true,
      data: hotel,
    });
    
  } catch (error) {
    next(error);
  }
};

export const updateHotelInfoController = async (req, res, next) => {
  try {
    const updated = await hotelService.updateHotelInfo(req.body);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
export const createHotelController = async (req, res) => {
  try {
    const newHotel = await hotelService.createHotel(req.body);
    return res.status(201).json({
      success: true,
      message: "Tạo khách sạn thành công!",
      data: newHotel
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Tạo khách sạn thất bại!",
      error: error.message
    });
  }
};