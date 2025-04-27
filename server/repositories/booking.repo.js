import Booking from '../models/Booking.js';

export const createBooking = async (bookingData) => {
  const booking = await Booking.create(bookingData);
  return booking;
};

export const findBookingsByUserId = async (userId) => {
  return await Booking.find({ user: userId }).populate('room');
};

export const findAllBookings = async () => {
  return await Booking.find().populate('user').populate('room');
};

export const findBookingsByStatus = async (status) => {
  return await Booking.find({ status }).populate('user').populate('room');
};

export const updateBookingStatus = async (id, status) => {
  const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
  if (!booking) {
    throw new Error('Booking không tồn tại');
  }
  return booking;
};
