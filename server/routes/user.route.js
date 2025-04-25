import express from 'express';
import { registerUser, getAllUsers, loginUser,updateUser, deleteUser } from '../controllers/userController.js';
import { verifyTokenMiddleware,checkRoleMiddleware } from '../middlewares/authMiddleware.js';
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/', getAllUsers);
userRouter.put('/:id', verifyTokenMiddleware, updateUser);
userRouter.delete('/:id', verifyTokenMiddleware, checkRoleMiddleware('admin'), deleteUser);
export default userRouter;