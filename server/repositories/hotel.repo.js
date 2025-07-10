import Hotels from '../models/Hotel.js';
export const getInfoHotel = async () => await Hotels.findOne();
export const updateInfoHotel = async (data) => {
  const hotel = await Hotels.findOne();
  if (!hotel) throw new Error("Hotel not found");
  return await Hotels.findByIdAndUpdate(hotel._id, data, { new: true });
};
export const createHotel = async(data) => {
  const newHotel = new Hotels(data)
  return await newHotel.save();
}
  