import express from 'express';
import { getAllActivities, getActivityById, createActivity, updateActivity, deleteActivity } from '../controllers/activityController.js';
import { verifyTokenMiddleware, checkRoleMiddleware } from '../middlewares/authMiddleware.js';

const activityRouter = express.Router();

// Public routes
activityRouter.get('/', getAllActivities);
activityRouter.get('/:id', getActivityById);

// Admin only routes
activityRouter.post('/', verifyTokenMiddleware, checkRoleMiddleware('admin'), createActivity);
activityRouter.put('/:id', verifyTokenMiddleware, checkRoleMiddleware('admin'), updateActivity);
activityRouter.delete('/:id', verifyTokenMiddleware, checkRoleMiddleware('admin'), deleteActivity);

export default activityRouter;