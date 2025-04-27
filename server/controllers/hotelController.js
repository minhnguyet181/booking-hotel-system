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
