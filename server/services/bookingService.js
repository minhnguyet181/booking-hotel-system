import * as bookingRepository from '../repositories/booking.repo.js';
import * as notiService from './notiService.js';

export const createBooking = async (userId, bookingData) => {
  // Gán userId vào bookingData
  bookingData.user = userId;
  bookingData.status = 'pending';
  console.log('✅ bookingData gửi vào bookingRepository:', bookingData);

  // Tạo booking mới
  const booking = await bookingRepository.createBooking(bookingData);

  // Gửi notification cho user
  const message = 'Đặt phòng của bạn đã được ghi nhận. Hãy đợi nhân viên xác nhận thông tin đặt phòng.';
  // if (!userId) {
  //   console.error('❌ userId is missing when creating notification');
  // } else {
  //   // const message = 'Đặt phòng của bạn đã được ghi nhận...';
  //   await notiService.createNotification(userId, message);
  // }
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

  // Gửi notification sau khi cập nhật thành công
  if (booking.user) {
    let message = '';
    if (status === 'confirmed') {
      message = 'Đặt phòng của bạn đã được xác nhận thành công!';
    } else if (status === 'canceled') {
      message = 'Đặt phòng của bạn đã bị từ chối!';
    } else {
      message = `Trạng thái đặt phòng của bạn đã thay đổi thành ${status}`;
    }

    await notiService.createNotification(booking.user, message);
  }

  return booking;
};
export const  getHandledBookingsService= async () => {
  return await bookingRepository.findBookingsByStatus(['confirmed', 'canceled']);
};