import * as notiService from '../services/notiService.js';

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await notiService.getNotificationsByUserId(req.user.id);
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error('Error getting notifications:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const count = await notiService.getUnreadCountByUserId(req.user.id);
    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error('Error getting unread count:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notification = await notiService.markNotificationAsRead(req.params.id);
    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};