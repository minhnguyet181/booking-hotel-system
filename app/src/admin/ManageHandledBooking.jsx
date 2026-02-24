import React, { useState, useEffect } from "react";
import { Container, Title, Table, Group, Button, Loader, Text, Alert, TextInput, Badge, Select } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import api from "../axios"; 
import { AiOutlineRollback } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

function ManageHandledBooking() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const fetchHandledBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/booking/handled"); 
      if (res.data && res.data.success) {
        const bookingsList = res.data.bookings || [];
        setBookings(bookingsList);
        setFilteredBookings(bookingsList);
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

  useEffect(() => {
    let filtered = bookings;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.room?.roomName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  }, [searchTerm, statusFilter, bookings]);

  const calculateTotalPrice = (booking) => {
    if (!booking.checkInDate || !booking.checkOutDate || !booking.room?.price) return 0;
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const price = booking.room.discountPrice > 0 ? booking.room.discountPrice : booking.room.price;
    return nights * price;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
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
      {/* Nhóm nút chuyển trang */}
      <Group position="apart" mt="md" mb="md">
        <Title order={2}>Quản lý đơn đã xử lý</Title>
        <Group>
          <Button variant="outline" onClick={() => navigate("/admin/bookings")}>
            Đơn Pending
          </Button>
          <Button variant="filled" color="blue" onClick={() => navigate("/admin/bookings/handled")}>
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

      {/* Search and Filter */}
      <Group mb="md" spacing="md">
        <TextInput
          placeholder="Tìm kiếm theo tên, email, tên phòng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<FaSearch size={16} />}
          style={{ flex: 1 }}
        />
        <Select
          placeholder="Lọc theo trạng thái"
          value={statusFilter}
          onChange={setStatusFilter}
          data={[
            { value: 'all', label: 'Tất cả' },
            { value: 'confirmed', label: 'Đã xác nhận' },
            { value: 'canceled', label: 'Đã hủy' }
          ]}
          style={{ width: 200 }}
        />
        <Text size="sm" color="dimmed">
          Tổng: {filteredBookings.length} đơn
        </Text>
      </Group>

      {error && (
        <Alert color="red" title="Lỗi" mb="md">
          {error}
        </Alert>
      )}

      {/* Bảng dữ liệu */}
      {filteredBookings.length === 0 ? (
        <Text align="center" size="lg" color="dimmed" mt="xl" py="xl">
          {searchTerm || statusFilter !== 'all' 
            ? 'Không tìm thấy booking nào phù hợp' 
            : 'Không có booking đã xử lý nào'}
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
              <th>Số khách</th>
              <th>Tổng tiền</th>
              <th>Ngày đặt</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.user?.fullName || 'N/A'}</td>
                <td>{booking.user?.email || 'N/A'}</td>
                <td>{booking.room?.roomName || 'N/A'}</td>
                <td>{booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString('vi-VN') : 'N/A'}</td>
                <td>{booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString('vi-VN') : 'N/A'}</td>
                <td>{booking.numberOfGuests || 'N/A'}</td>
                <td>
                  <Text weight={500} color="blue">
                    {formatPrice(calculateTotalPrice(booking))}
                  </Text>
                </td>
                <td>{booking.createdAt ? new Date(booking.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</td>
                <td>
                  <Badge 
                    color={booking.status === 'confirmed' ? 'green' : 'red'}
                    variant="light"
                  >
                    {booking.status === "confirmed" ? "Đã xác nhận" : "Đã hủy"}
                  </Badge>
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
