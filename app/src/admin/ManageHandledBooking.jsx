import React, { useState, useEffect } from "react";
import { Container, Title, Table, Group, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import api from "../axios"; 
import { AiOutlineRollback } from "react-icons/ai";

function ManageHandledBooking() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchHandledBookings = async () => {
    try {
      const res = await api.get("/booking/handled"); 
      setBookings(res.data.bookings || []);
    } catch (error) {
      console.error("Error fetching handled bookings:", error);
    }
  };

  useEffect(() => {
    fetchHandledBookings();
  }, []);

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
      >
        Quay về trang Admin
      </Button>
      {/* Bảng dữ liệu */}
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Tên người dùng</th>
            <th>Phòng</th>
            <th>Ngày đặt</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.user?.email}</td>
              <td>{booking.room?.roomName}</td>
              <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
              <td>{booking.status === "confirmed" ? "Đã xác nhận" : "Đã hủy"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ManageHandledBooking;
