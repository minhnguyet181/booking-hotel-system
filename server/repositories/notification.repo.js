import Notification from '../models/Notification.js';

export const createNotification = async (userId, message) => {
  const notification = new Notification({
    user: userId,
    message,
    isRead: false
  });
  
  return await notification.save();
};

export const getNotificationsByUserId = async (userId) => {
  return await Notification.find({ user: userId }).sort({ createdAt: -1 });
};

export const getUnreadCountByUserId = async (userId) => {
  return await Notification.countDocuments({ user: userId, isRead: false });
};

export const markNotificationAsRead = async (notificationId) => {
  return await Notification.findByIdAndUpdate(
    notificationId,
    { isRead: true },
    { new: true }
  );
};
