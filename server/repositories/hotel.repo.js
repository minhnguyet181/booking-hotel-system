import Hotels from '../models/Hotel.js';
// import Rooms from '../models/Rooms.js';

export const createHotel = async (data) => await Hotels.create(data);
export const findHotelById = async (id) => await Hotels.findById(id);
export const findAllHotels = async ({ min = 99, max = 999, ...others }) => {
  return await Hotels.find({ ...others, cheapestPrice: { $gte: min, $lte: max } });
};
export const updateHotelById = async (id, data) => await Hotels.findByIdAndUpdate(id, data, { new: true });
export const deleteHotelById = async (id) => await Hotels.findByIdAndDelete(id);

export const countHotelsByCity = async (citiesString) => {
  const cities = citiesString.split(',');
  return await Promise.all(cities.map(city => Hotels.countDocuments({ city })));
};

export const countHotelsByType = async () => {
  const hotelCount = await Hotels.countDocuments({ type: { $regex: /hotel/i } });
  const apartmentCount = await Hotels.countDocuments({ type: "apartment" });
  const resortCount = await Hotels.countDocuments({ type: "resort" });
  const villaCount = await Hotels.countDocuments({ type: "villa" });
  const cabinCount = await Hotels.countDocuments({ type: "cabin" });
  return [
    { type: "hotels", count: hotelCount },
    { type: "apartments", count: apartmentCount },
    { type: "resorts", count: resortCount },
    { type: "villas", count: villaCount },
    { type: "cabins", count: cabinCount },
  ];
};

// export const getRoomsInHotel = async (hotelId) => {
//   const hotel = await Hotels.findById(hotelId);
//   return await Promise.all(hotel.rooms.map(roomId => Rooms.findById(roomId)));
// };
