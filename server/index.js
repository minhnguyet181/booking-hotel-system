// ... existing code ...
import notificationRoutes from './routes/notification.routes.js';

// ... existing code ...

// Đăng ký routes
app.use('/api/notifications', notificationRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

// ... existing code ...