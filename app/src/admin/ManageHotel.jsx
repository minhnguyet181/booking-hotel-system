import React, { useState, useEffect } from "react";
import { Container, Title, TextInput, Button, Group, Alert, Textarea, Stack, Loader } from "@mantine/core";
import api from "../axios";
import {AiOutlineRollback} from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

function ManageHotel() {
  const [hotelInfo, setHotelInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const fetchHotelInfo = async () => {
    try {
      setLoading(true);
      const res = await api.get("/hotel");
      setHotelInfo(res.data.data || {});
    } catch (error) {
      console.error("Error fetching hotel info:", error);
      setNotification({ type: 'error', message: 'Không thể tải thông tin khách sạn' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateHotelInfo = async () => {
    // Validation
    if (!hotelInfo.name || !hotelInfo.address || !hotelInfo.phone || !hotelInfo.email) {
      setNotification({ type: 'error', message: 'Vui lòng điền đầy đủ thông tin bắt buộc' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(hotelInfo.email)) {
      setNotification({ type: 'error', message: 'Email không hợp lệ' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    try {
      setSaving(true);
      await api.put("/hotel", hotelInfo);
      setNotification({ type: 'success', message: 'Cập nhật thông tin khách sạn thành công!' });
      fetchHotelInfo();
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Error updating hotel info:", error);
      setNotification({ 
        type: 'error', 
        message: error.response?.data?.message || 'Lỗi khi cập nhật thông tin khách sạn' 
      });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchHotelInfo();
  }, []);

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Loader size="lg" />
      </Container>
    );
  }

  return (
    <Container size="md">
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

      <Title order={2} mt="md" mb="md">Quản lý thông tin khách sạn</Title>
      <Button
        variant="outline"
        color="gray"
        onClick={() => navigate("/admin")}
        leftIcon={<AiOutlineRollback size={20} />}
        mb="md"
      >
        Quay về trang Admin
      </Button>

      <Stack spacing="md">
        <TextInput
          label="Tên khách sạn"
          value={hotelInfo.name}
          onChange={(e) => setHotelInfo({ ...hotelInfo, name: e.target.value })}
          required
          placeholder="Nhập tên khách sạn"
        />
        <TextInput
          label="Địa chỉ"
          value={hotelInfo.address}
          onChange={(e) => setHotelInfo({ ...hotelInfo, address: e.target.value })}
          required
          placeholder="Nhập địa chỉ khách sạn"
        />
        <TextInput
          label="Số điện thoại"
          value={hotelInfo.phone}
          onChange={(e) => setHotelInfo({ ...hotelInfo, phone: e.target.value })}
          required
          placeholder="Nhập số điện thoại"
        />
        <TextInput
          label="Email"
          type="email"
          value={hotelInfo.email}
          onChange={(e) => setHotelInfo({ ...hotelInfo, email: e.target.value })}
          required
          placeholder="Nhập email khách sạn"
        />
        <Textarea
          label="Mô tả"
          value={hotelInfo.description}
          onChange={(e) => setHotelInfo({ ...hotelInfo, description: e.target.value })}
          placeholder="Nhập mô tả về khách sạn"
          minRows={4}
        />
      </Stack>

      <Group position="right" mt="xl">
        <Button 
          onClick={handleUpdateHotelInfo} 
          loading={saving}
          size="md"
        >
          Cập nhật thông tin
        </Button>
      </Group>
    </Container>
  );
}

export default ManageHotel;
