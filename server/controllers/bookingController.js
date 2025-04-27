import * as bookingService from '../services/bookingService.js';

export const createBooking = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ Lấy user từ token
    const bookingData = req.body; // ✅ Lấy dữ liệu từ body request

    const booking = await bookingService.createBooking(userId, bookingData); // ✅ Gọi service
    res.status(201).json({ success: true, data: booking }); // ✅ Trả về booking thành công
  } catch (error) {
    console.error("❌ Error in createBooking:", error);
    res.status(400).json({ success: false, message: error.message }); // ✅ Trả lỗi chi tiết
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getBookingsByUser(req.user._id);
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings(); // 👈 lấy từ service
    res.status(200).json({
      success: true,
      bookings, // 👈 TRẢ bookings ở đây
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
    });
  }
};


export const getPendingBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getPendingBookings();
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const booking = await bookingService.updateBookingStatus(req.params.id, 'confirmed');
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Admin: Hủy booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await bookingService.updateBookingStatus(req.params.id, 'canceled');
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
