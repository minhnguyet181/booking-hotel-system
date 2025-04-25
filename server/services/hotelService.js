import * as hotelRepository from '../repositories/hotel.repo.js';

export const addHotel = async (data) => await hotelRepository.createHotel(data);
export const getHotel = async (id) => await hotelRepository.findHotelById(id);
export const getAllHotels = async (query) => await hotelRepository.findAllHotels(query);
export const updateHotel = async (id, data) => await hotelRepository.updateHotelById(id, data);
export const deleteHotel = async (id) => await hotelRepository.deleteHotelById(id);
export const countByCity = async (cities) => await hotelRepository.countHotelsByCity(cities);
export const countByType = async () => await hotelRepository.countHotelsByType();
export const getHotelRooms = async (hotelId) => await hotelRepository.getRoomsInHotel(hotelId);

