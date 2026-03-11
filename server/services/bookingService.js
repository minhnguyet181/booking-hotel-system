import * as bookingRepository from '../repositories/booking.repo.js';
import * as notiService from './notiService.js';

export const createBooking = async (userId, bookingData) => {
  // Gán userId vào bookingData
  bookingData.user = userId;
  bookingData.status = 'pending';
  console.log('✅ bookingData gửi vào bookingRepository:', bookingData);

  // Tạo booking mới
  const booking = await bookingRepository.createBooking(bookingData);

  // Gửi notification cho user (wrap trong try-catch để không làm lỗi booking process)
  if (userId) {
    try {
      const message = '📋 Đặt phòng của bạn đã được ghi nhận. Trạng thái: Đang chờ xác nhận. Hãy đợi nhân viên xác nhận thông tin đặt phòng.';
      await notiService.createNotification(userId, message);
    } catch (error) {
      console.error('❌ Lỗi khi tạo notification:', error);
      // Không throw error để booking vẫn được tạo thành công
    }
  }
  
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

  // Gửi notification sau khi cập nhật thành công (wrap trong try-catch để không làm lỗi booking update)
  if (booking.user) {
    try {
      let message = '';
      if (status === 'confirmed') {
        message = '✅ Đặt phòng của bạn đã được xác nhận thành công! Vui lòng chuẩn bị thông tin check-in.';
      } else if (status === 'canceled') {
        message = '❌ Đặt phòng của bạn đã bị từ chối. Vui lòng liên hệ với chúng tôi nếu có thắc mắc.';
      } else if (status === 'checked-in') {
        message = '🏨 Bạn đã check-in thành công! Chúc bạn có một kỳ nghỉ tuyệt vời!';
      } else if (status === 'checked-out') {
        message = '👋 Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi! Hẹn gặp lại!';
      } else {
        message = `ℹ️ Trạng thái đặt phòng của bạn đã thay đổi thành: ${status}`;
      }

      // Lấy userId từ booking.user (có thể là ObjectId hoặc populated object)
      const userId = booking.user._id || booking.user;
      await notiService.createNotification(userId, message);
    } catch (error) {
      console.error('❌ Lỗi khi tạo notification:', error);
      // Không throw error để booking vẫn được cập nhật thành công
    }
  }

  return booking;
};
export const getHandledBookingsService = async () => {
  return await bookingRepository.findBookingsByStatuses(['confirmed', 'canceled']);
};