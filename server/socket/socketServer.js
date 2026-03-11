import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Store user socket connections: userId -> socketId
const userSockets = new Map();
let ioInstance = null;

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  });

  ioInstance = io;

  // Middleware để xác thực token
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Không có token'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return next(new Error('Người dùng không tồn tại'));
      }

      socket.userId = decoded.id;
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Token không hợp lệ'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`✅ User ${socket.userId} connected via socket`);

    // Lưu socket connection của user
    userSockets.set(socket.userId.toString(), socket.id);

    // Gửi thông báo chào mừng
    socket.emit('connected', { message: 'Kết nối thành công' });

    // Xử lý khi client disconnect
    socket.on('disconnect', () => {
      console.log(`❌ User ${socket.userId} disconnected`);
      userSockets.delete(socket.userId.toString());
    });
  });

  return io;
};

// Hàm gửi notification real-time đến user
export const sendNotificationToUser = (userId, notification) => {
  if (!ioInstance) {
    console.log('⚠️ Socket.io chưa được khởi tạo');
    return;
  }
  
  const socketId = userSockets.get(userId.toString());
  if (socketId) {
    ioInstance.to(socketId).emit('new-notification', notification);
    console.log(`📨 Sent notification to user ${userId}`);
  } else {
    console.log(`⚠️ User ${userId} is not connected`);
  }
};

// Hàm broadcast notification đến tất cả users
export const broadcastNotification = (notification) => {
  if (!ioInstance) {
    console.log('⚠️ Socket.io chưa được khởi tạo');
    return;
  }
  ioInstance.emit('new-notification', notification);
};
