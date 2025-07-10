import express from 'express';
import * as bookingController from '../controllers/bookingController.js';
import { verifyTokenMiddleware, checkRoleMiddleware } from '../middlewares/authMiddleware.js'; 

const bookingRouter = express.Router();

bookingRouter.post('/', verifyTokenMiddleware, bookingController.createBooking);


bookingRouter.get('/my-bookings', verifyTokenMiddleware, bookingController.getUserBookings);


bookingRouter.get('/', verifyTokenMiddleware, checkRoleMiddleware('admin'), bookingController.getAllBookings);
bookingRouter.get('/pending', verifyTokenMiddleware, checkRoleMiddleware('admin'), bookingController.getPendingBookings);

bookingRouter.put('/:id/confirm', verifyTokenMiddleware, checkRoleMiddleware('admin'), bookingController.confirmBooking);

bookingRouter.put('/:id/cancel', verifyTokenMiddleware, checkRoleMiddleware('admin'), bookingController.cancelBooking);
bookingRouter.get('/handled', verifyTokenMiddleware, checkRoleMiddleware('admin'), bookingController.getHandledBookings);

export default bookingRouter;
