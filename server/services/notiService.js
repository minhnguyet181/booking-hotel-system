import * as bookingRepository from '../repositories/booking.repo.js';
import * as notificationRepository from '../repositories/notification.repo.js';

// export const createBooking = async (userId, bookingData) => {
//   bookingData.user = userId;
//   bookingData.status = 'pending';
  
//   const booking = await bookingRepository.createBooking(bookingData);

//   // 🔥 Tạo notification sau khi booking thành công
//   const message = `Booking của bạn đã được tạo thành công với trạng thái: ${booking.status}.`;
//   await notificationRepository.createNotification(userId, message);

//   return booking;
// };

export const createNotification = async (userId, message) => {
  return await notificationRepository.createNotification(userId, message);
};

export const getNotificationsByUserId = async (userId) => {
  return await notificationRepository.getNotificationsByUserId(userId);
};

export const getUnreadCountByUserId = async (userId) => {
  return await notificationRepository.getUnreadCountByUserId(userId);
};

export const markNotificationAsRead = async (notificationId) => {
  return await notificationRepository.markNotificationAsRead(notificationId);
};
