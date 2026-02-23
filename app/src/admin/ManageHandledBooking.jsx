import React, { useState, useEffect } from "react";
import { Container, Title, Table, Group, Button, Loader, Text, Alert } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import api from "../axios"; 
import { AiOutlineRollback } from "react-icons/ai";

function ManageHandledBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchHandledBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/booking/handled"); 
      if (res.data && res.data.success) {
        setBookings(res.data.bookings || []);
      } else {
        setError("Không thể tải danh sách booking đã xử lý");
      }
    } catch (error) {
      console.error("Error fetching handled bookings:", error);
      setError(error.response?.data?.message || "Lỗi khi tải danh sách booking đã xử lý");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHandledBookings();
  }, []);

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Loader size="lg" />
      </Container>
    );
  }

  return (
    <Container>
      {/* Nhóm nút chuyển trang */}
      <Group position="apart" mt="md" mb="md">
        <Title order={2}>Quản lý đơn đã xử lý</Title>
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

      {/* Bảng dữ liệu */}
      {bookings.length === 0 ? (
        <Text align="center" size="lg" color="dimmed" mt="xl">
          Không có booking đã xử lý nào
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
                  <Text weight={500} color={booking.status === 'confirmed' ? 'green' : 'red'}>
                    {booking.status === "confirmed" ? "Đã xác nhận" : "Đã hủy"}
                  </Text>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default ManageHandledBooking;
