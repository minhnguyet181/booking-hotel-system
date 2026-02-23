import React, { useState, useEffect } from "react";
import { Container, Title, Table, Button, Group, Loader, Text, Alert, Notification } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import { AiOutlineRollback } from "react-icons/ai";

function ManageBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState({});
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/booking/pending");
      if (res.data && res.data.success) {
        setBookings(res.data.bookings || []);
      } else {
        setError("Không thể tải danh sách booking");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError(error.response?.data?.message || "Lỗi khi tải danh sách booking");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateBooking = async (bookingId, newStatus) => {
    try {
      setUpdating({ ...updating, [bookingId]: true });
      
      if (newStatus === "confirmed") {
        await api.put(`/booking/${bookingId}/confirm`);
        setNotification({ type: 'success', message: 'Đã xác nhận booking thành công!' });
      } else if (newStatus === "canceled") {
        await api.put(`/booking/${bookingId}/cancel`);
        setNotification({ type: 'success', message: 'Đã hủy booking thành công!' });
      }
      
      // Refresh danh sách sau khi cập nhật
      await fetchBookings();
      
      // Ẩn notification sau 3 giây
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Error updating booking:", error);
      setNotification({ 
        type: 'error', 
        message: error.response?.data?.message || 'Lỗi khi cập nhật booking' 
      });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setUpdating({ ...updating, [bookingId]: false });
    }
  };
  

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Loader size="lg" />
      </Container>
    );
  }

  return (
    <Container>
      {notification && (
        <Alert 
          color={notification.type === 'success' ? 'green' : 'red'} 
          title={notification.type === 'success' ? 'Thành công' : 'Lỗi'}
          mb="md"
          onClose={() => setNotification(null)}
          withCloseButton
        >
          {notification.message}
        </Alert>
      )}

      {/* Nhóm 2 nút chuyển trang */}
      <Group position="apart" mt="md" mb="md">
        <Title order={2}>Quản lý đơn Pending</Title>
        <Group>
          <Button variant="outline" onClick={() => navigate("/admin/bookings")}>
            Đơn Pending
          </Button>
          <Button variant="outline" onClick={() => navigate("/admin/bookings/handled")}>
            Đơn Đã Xử Lý
          </Button>
        </Group>
      </Group>
      
      <Button
        variant="outline"
        color="gray"
        onClick={() => navigate("/admin")}
        leftIcon={<AiOutlineRollback size={20} />}
        mb="md"
      >
        Quay về trang Admin
      </Button>

      {error && (
        <Alert color="red" title="Lỗi" mb="md">
          {error}
        </Alert>
      )}

      {/* Table bookings */}
      {bookings.length === 0 ? (
        <Text align="center" size="lg" color="dimmed" mt="xl">
          Không có booking pending nào
        </Text>
      ) : (
        <Table striped highlightOnHover withBorder withColumnBorders>
          <thead>
            <tr>
              <th>Tên người dùng</th>
              <th>Email</th>
              <th>Phòng</th>
              <th>Ngày check-in</th>
              <th>Ngày check-out</th>
              <th>Ngày đặt</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.user?.fullName || 'N/A'}</td>
                <td>{booking.user?.email || 'N/A'}</td>
                <td>{booking.room?.roomName || 'N/A'}</td>
                <td>{booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString('vi-VN') : 'N/A'}</td>
                <td>{booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString('vi-VN') : 'N/A'}</td>
                <td>{booking.createdAt ? new Date(booking.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</td>
                <td>
                  <Text weight={500} color={booking.status === 'pending' ? 'orange' : booking.status === 'confirmed' ? 'green' : 'red'}>
                    {booking.status === 'pending' ? 'Chờ xử lý' : booking.status === 'confirmed' ? 'Đã xác nhận' : 'Đã hủy'}
                  </Text>
                </td>
                <td>
                  {booking.status === "pending" && (
                    <Group spacing="xs">
                      <Button 
                        color="green" 
                        size="xs" 
                        onClick={() => handleUpdateBooking(booking._id, "confirmed")}
                        loading={updating[booking._id]}
                        disabled={updating[booking._id]}
                      >
                        Xác nhận
                      </Button>
                      <Button 
                        color="red" 
                        size="xs" 
                        onClick={() => handleUpdateBooking(booking._id, "canceled")}
                        loading={updating[booking._id]}
                        disabled={updating[booking._id]}
                      >
                        Hủy
                      </Button>
                    </Group>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ManageBooking;
