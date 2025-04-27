import express from 'express';
import { verifyTokenMiddleware } from '../middlewares/authMiddleware.js';
import { getMyNotifications, markAsRead } from '../controllers/notificationController.js';

const notiRouter = express.Router();

notiRouter.get('/my-notifications', verifyTokenMiddleware, getMyNotifications);
notiRouter.put('/:id/read', verifyTokenMiddleware, markAsRead);

export default notiRouter;
