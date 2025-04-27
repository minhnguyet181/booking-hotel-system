import express from 'express';
import { getAllDestinations, getDestinationById, createDestination, updateDestination, deleteDestination } from '../controllers/destinationController.js';
import { verifyTokenMiddleware, checkRoleMiddleware } from '../middlewares/authMiddleware.js';

const destinationRouter = express.Router();

// Public routes
destinationRouter.get('/', getAllDestinations);
destinationRouter.get('/:id', getDestinationById);

// Admin only routes
destinationRouter.post('/', verifyTokenMiddleware, checkRoleMiddleware('admin'), createDestination);
destinationRouter.put('/:id', verifyTokenMiddleware, checkRoleMiddleware('admin'), updateDestination);
destinationRouter.delete('/:id', verifyTokenMiddleware, checkRoleMiddleware('admin'), deleteDestination);

export default destinationRouter;