import express from 'express';
import { verifyTokenMiddleware } from '../middlewares/authMiddleware.js';
import { getMyNotifications, getUnreadCount, markAsRead } from '../controllers/notificationController.js';

const notiRouter = express.Router();

notiRouter.get('/my-notifications', verifyTokenMiddleware, getMyNotifications);
notiRouter.get('/unread-count', verifyTokenMiddleware, getUnreadCount);
notiRouter.put('/:id/read', verifyTokenMiddleware, markAsRead);

export default notiRouter;
