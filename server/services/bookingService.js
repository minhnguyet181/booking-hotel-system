import * as bookingRepository from '../repositories/booking.repo.js';
import * as notificationRepository from '../repositories/notification.repo.js';
export const createBooking = async (userId, bookingData) => {
  bookingData.user = userId;
  bookingData.status = 'pending';
  return await bookingRepository.createBooking(bookingData);
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
  
    // 🔥 Gửi notification cho user sau khi booking được admin xử lý
    let message = '';
    if (status === 'confirmed') {
      message = 'Booking của bạn đã được xác nhận thành công.';
    } else if (status === 'cancelled') {
      message = 'Booking của bạn đã bị từ chối.';
    }
  
    if (message) {
      await notificationRepository.createNotification(booking.user, message);
    }
  
    return booking;
  };
