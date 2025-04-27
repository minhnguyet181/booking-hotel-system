import express from 'express';
import * as bookingController from '../controllers/bookingController.js';
import { verifyTokenMiddleware, checkRoleMiddleware } from '../middlewares/authMiddleware.js'; 

const bookingRouter = express.Router();

// Người dùng đặt phòng

// Người dùng đã login => được phép book phòng
bookingRouter.post('/', verifyTokenMiddleware, bookingController.createBooking);

// Người dùng đã login => được xem lịch sử booking của họ
bookingRouter.get('/my-bookings', verifyTokenMiddleware, bookingController.getUserBookings);

// Admin => xem tất cả bookings
bookingRouter.get('/', verifyTokenMiddleware, checkRoleMiddleware('admin'), bookingController.getAllBookings);
bookingRouter.get('/pending', verifyTokenMiddleware, checkRoleMiddleware('admin'), bookingController.getPendingBookings);

// Admin => xác nhận booking
bookingRouter.put('/:id/confirm', verifyTokenMiddleware, checkRoleMiddleware('admin'), bookingController.confirmBooking);

// Admin => hủy booking
bookingRouter.put('/:id/cancel', verifyTokenMiddleware, checkRoleMiddleware('admin'), bookingController.cancelBooking);

export default bookingRouter;
