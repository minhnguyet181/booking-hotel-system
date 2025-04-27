import express from 'express';
import { registerUser, getAllUsers, loginUser, updateUserByAdmin, updateUser, deleteUser } from '../controllers/userController.js';
import { verifyTokenMiddleware, checkRoleMiddleware } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.put('/profile', verifyTokenMiddleware, updateUser);

// Admin lấy danh sách, update user khác, xóa user
userRouter.get('/', verifyTokenMiddleware, checkRoleMiddleware('admin'), getAllUsers);
userRouter.put('/:id',verifyTokenMiddleware,checkRoleMiddleware('admin'), updateUserByAdmin);
userRouter.delete('/:id', verifyTokenMiddleware, checkRoleMiddleware('admin'), deleteUser);

export default userRouter;
