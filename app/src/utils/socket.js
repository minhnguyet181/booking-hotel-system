import { io } from 'socket.io-client';

let socket = null;

export const initializeSocket = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.log('⚠️ No token found, cannot connect to socket');
    return null;
  }

  if (socket && socket.connected) {
    return socket;
  }

  socket = io('http://localhost:5000', {
    auth: {
      token: token,
    },
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log('✅ Connected to socket server');
  });

  socket.on('disconnect', () => {
    console.log('❌ Disconnected from socket server');
  });

  socket.on('connected', (data) => {
    console.log('📨 Socket message:', data.message);
  });

  socket.on('connect_error', (error) => {
    console.error('❌ Socket connection error:', error.message);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => {
  return socket;
};
