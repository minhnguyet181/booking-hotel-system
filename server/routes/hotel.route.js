import express from 'express';
import {  getHotelInfoController, updateHotelInfoController,createHotelController} from '../controllers/hotelController.js';
import { verifyTokenMiddleware, checkRoleMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getHotelInfoController); // public
router.put('/', verifyTokenMiddleware, checkRoleMiddleware('admin'), updateHotelInfoController); // admin only
router.post('/',verifyTokenMiddleware,checkRoleMiddleware('admin'),createHotelController);
export default router;