import React, { useEffect, useState } from 'react';
import { Container, Title, Card, SimpleGrid, Text, Loader, Alert, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { FaUserCog, FaHotel, FaClipboardList, FaBed } from 'react-icons/fa';

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setIsAdmin(user.role === 'admin');
        } catch (error) {
          console.error('Error parsing user data:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    };

    checkAdmin();
  }, []);

  const adminFunctions = [
    {
      title: 'Quản lý người dùng',
      description: 'Thêm, sửa, xóa tài khoản người dùng.',
      icon: <FaUserCog size={30} />,
      link: '/admin/users',
    },
    {
      title: 'Quản lý booking',
      description: 'Quản lý các bookings.',
      icon: <FaClipboardList size={30} />,
      link: '/admin/bookings',
    },
    {
      title: 'Quản lý phòng',
      description: 'Cập nhật thông tin phòng, giá cả, ưu đãi.',
      icon: <FaBed size={30} />,
      link: '/admin/rooms',
    },
    {
      title: 'Quản lý khách sạn',
      description: 'Sửa thông tin hoạt động, điểm đến, dịch vụ.',
      icon: <FaHotel size={30} />,
      link: '/admin/hotel-info',
    },
  ];

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Loader size="lg" />
      </Container>
    );
  }

  if (!isAdmin) {
    return (
      <Container size="lg" py="xl">
        <Alert color="red" title="Không có quyền truy cập" mb="md">
          Bạn cần quyền admin để truy cập trang này.
        </Alert>
        <Button onClick={() => navigate('/')}>Về trang chủ</Button>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="xl" align="center">
        Trang quản trị hệ thống Booking Hotel
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 2 }} spacing="lg">
        {adminFunctions.map((func, index) => (
          <Card
            key={index}
            shadow="md"
            padding="lg"
            radius="md"
            withBorder
            sx={{ cursor: 'pointer', transition: '0.3s', '&:hover': { backgroundColor: '#f8f9fa' } }}
            onClick={() => navigate(func.link)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              {func.icon}
              <Title order={4}>{func.title}</Title>
            </div>
            <Text size="sm" color="dimmed">
              {func.description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default AdminPage;
