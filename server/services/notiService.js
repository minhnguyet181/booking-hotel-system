import * as bookingRepository from '../repositories/booking.repo.js';
import * as notificationRepository from '../repositories/notification.repo.js';
import { sendNotificationToUser } from '../socket/socketServer.js';

// export const createBooking = async (userId, bookingData) => {
//   bookingData.user = userId;
//   bookingData.status = 'pending';
  
//   const booking = await bookingRepository.createBooking(bookingData);

//   // 🔥 Tạo notification sau khi booking thành công
//   const message = `Booking của bạn đã được tạo thành công với trạng thái: ${booking.status}.`;
//   await notificationRepository.createNotification(userId, message);

//   return booking;
// };

export const createNotification = async (userId, message, sendRealTime = true) => {
  const notification = await notificationRepository.createNotification(userId, message);
  
  // Gửi real-time notification nếu có Socket.io connection
  if (sendRealTime) {
    try {
      sendNotificationToUser(userId, {
        _id: notification._id,
        message: notification.message,
        isRead: notification.isRead,
        createdAt: notification.createdAt,
      });
    } catch (error) {
      console.error('❌ Error sending real-time notification:', error);
      // Không throw error, chỉ log để không làm gián đoạn flow
    }
  }
  
  return notification;
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
