import express from 'express';
import {
  addHotelController,
  getHotelController,
  getAllHotelsController,
  updateHotelController,
  deleteHotelController,
  countByCityController,
  countByTypeController,
  getHotelRoomsController
} from '../controllers/hotelController.js';
import { verifyTokenMiddleware, checkRoleMiddleware } from '../middlewares/authMiddleware.js';

const hotelRouter = express.Router();

hotelRouter.post('/', verifyTokenMiddleware, checkRoleMiddleware('admin'), addHotelController);
hotelRouter.get('/:id', verifyTokenMiddleware, getHotelController);
hotelRouter.get('/', verifyTokenMiddleware, getAllHotelsController);
hotelRouter.put('/:id', verifyTokenMiddleware, checkRoleMiddleware('admin'), updateHotelController);
hotelRouter.delete('/:id', verifyTokenMiddleware, checkRoleMiddleware('admin'), deleteHotelController);
hotelRouter.get('/count/byCity', verifyTokenMiddleware, countByCityController);
hotelRouter.get('/count/byType', verifyTokenMiddleware, countByTypeController);
hotelRouter.get('/room/:id', verifyTokenMiddleware, getHotelRoomsController);

export default hotelRouter;