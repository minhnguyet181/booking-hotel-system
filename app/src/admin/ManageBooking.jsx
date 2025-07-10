import React, { useState, useEffect } from "react";
import { Container, Title, Table, Button, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom"; // <-- Thêm import này
import api from "../axios";
import { AiOutlineRollback } from "react-icons/ai";

function ManageBooking() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate(); // <-- Khởi tạo điều hướng

  const fetchBookings = async () => {
    try {
      const res = await api.get("/booking/pending");
      setBookings(res.data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);
  const handleUpdateBooking = async (bookingId, newStatus) => {
    try {
      if (newStatus === "confirmed") {
        await api.put(`/booking/${bookingId}/confirm`);
      } else if (newStatus === "canceled") {
        await api.put(`/booking/${bookingId}/cancel`);
      }
      
      // Sau khi cập nhật xong thì remove booking đó ra khỏi list bookings pending
      setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };
  

  return (
    <Container>
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
            >
              Quay về trang Admin
            </Button>
      {/* Table bookings */}
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Tên người dùng</th>
            <th>Phòng</th>
            <th>Ngày đặt</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.user?.fullName}</td>
              <td>{booking.room?.roomName}</td>
              <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
              <td>{booking.status}</td>
              <td>
                {booking.status === "pending" && (
                  <Group spacing="xs">
                    <Button color="green" size="xs" onClick={() => handleUpdateBooking(booking._id, "confirmed")}>
                      Xác nhận
                    </Button>
                    <Button color="red" size="xs" onClick={() => handleUpdateBooking(booking._id, "canceled")}>
                      Hủy
                    </Button>
                  </Group>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ManageBooking;
