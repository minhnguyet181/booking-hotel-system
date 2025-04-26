import * as notificationService from '../services/notiService.js';

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getNotificationsByUserId(req.user.id);
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notification = await notificationService.markNotificationAsRead(req.params.id);
    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
