import React, { useState, useEffect } from "react";
import { Container, Title, Table, Button, Group } from "@mantine/core";
import api from "../axios";

function ManageBooking() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/booking");
      setBookings(res.data.data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateBooking = async (bookingId, newStatus) => {
    try {
      await api.put(`/booking/${bookingId}`, { status: newStatus });
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <Container>
      <Group position="apart" mt="md" mb="md">
        <Title order={2}>Quản lý đơn đặt phòng</Title>
      </Group>

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
              <td>{booking.user?.email}</td>
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
