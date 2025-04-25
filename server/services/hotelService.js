import * as hotelRepository from '../repositories/hotel.repo.js';

export const getHotelInfo = async () => await hotelRepository.getInfoHotel();
export const updateHotelInfo = async (data) => await hotelRepository.updateInfoHotel(data);

