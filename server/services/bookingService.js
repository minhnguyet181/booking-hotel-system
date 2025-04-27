import * as bookingRepository from '../repositories/booking.repo.js';
import * as notiService from './notiService.js';

export const createBooking = async (userId, bookingData) => {
  bookingData.user = userId;
  bookingData.status = 'pending';
  
  const booking = await bookingRepository.createBooking(bookingData);

  // Tạo thông báo sau khi đặt phòng thành công
  const message = `Đặt phòng của bạn đã được ghi nhận. Hãy đợi nhân viên xác nhận thông tin đặt phòng.`;
  await notiService.createNotification(userId, message);

  return booking;
};

export const getBookingsByUserId = async (userId) => {
  return await bookingRepository.findBookingsByUserId(userId);
};

export const getAllBookings = async () => {
  return await bookingRepository.findAllBookings();
};

export const getPendingBookings = async () => {
  return await bookingRepository.findBookingsByStatus('pending');
};

export const updateBookingStatus = async (id, status) => {
  const booking = await bookingRepository.updateBookingStatus(id, status);
  
  if (!booking) {
    throw new Error('Không tìm thấy booking');
  }
  
  // Gửi thông báo cho người dùng khi trạng thái đặt phòng thay đổi
  let message = '';
  if (status === 'confirmed') {
    message = 'Đặt phòng của bạn đã được xác nhận thành công.';
  } else if (status === 'cancelled') {
    message = 'Đặt phòng của bạn đã bị từ chối.';
  }
  
  if (message && booking.user) {
    await notiService.createNotification(booking.user, message);
  }
  
  return booking;
};
