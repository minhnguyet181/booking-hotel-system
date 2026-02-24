import React, { useEffect, useState } from 'react';
import { Container, Title, Card, SimpleGrid, Text, Loader, Alert, Button, Group, Badge, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { FaUserCog, FaHotel, FaClipboardList, FaBed, FaUsers, FaBook, FaBed as FaBedIcon } from 'react-icons/fa';
import api from '../axios';

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalRooms: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

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

  useEffect(() => {
    const fetchStats = async () => {
      if (!isAdmin) return;
      
      try {
        setStatsLoading(true);
        const [usersRes, bookingsRes, pendingRes, roomsRes] = await Promise.all([
          api.get('/users').catch(() => ({ data: [] })),
          api.get('/booking').catch(() => ({ data: { success: false, bookings: [] } })),
          api.get('/booking/pending').catch(() => ({ data: { success: false, bookings: [] } })),
          api.get('/rooms').catch(() => ({ data: { success: false, data: [] } }))
        ]);

        setStats({
          totalUsers: Array.isArray(usersRes.data) ? usersRes.data.length : 0,
          totalBookings: bookingsRes.data?.success ? (bookingsRes.data.bookings?.length || 0) : 0,
          pendingBookings: pendingRes.data?.success ? (pendingRes.data.bookings?.length || 0) : 0,
          totalRooms: roomsRes.data?.success ? (roomsRes.data.data?.length || 0) : 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setStatsLoading(false);
      }
    };

    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

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

      {/* Statistics Dashboard */}
      {!statsLoading && (
        <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md" mb="xl">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack spacing="xs" align="center">
              <FaUsers size={32} color="#228be6" />
              <Text size="xl" weight={700}>{stats.totalUsers}</Text>
              <Text size="sm" color="dimmed">Tổng người dùng</Text>
            </Stack>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack spacing="xs" align="center">
              <FaBook size={32} color="#51cf66" />
              <Text size="xl" weight={700}>{stats.totalBookings}</Text>
              <Text size="sm" color="dimmed">Tổng booking</Text>
            </Stack>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack spacing="xs" align="center">
              <FaClipboardList size={32} color="#ffa94d" />
              <Text size="xl" weight={700}>{stats.pendingBookings}</Text>
              <Text size="sm" color="dimmed">Đơn chờ xử lý</Text>
              {stats.pendingBookings > 0 && (
                <Badge color="orange" variant="light" size="sm">
                  Cần xử lý
                </Badge>
              )}
            </Stack>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack spacing="xs" align="center">
              <FaBedIcon size={32} color="#7950f2" />
              <Text size="xl" weight={700}>{stats.totalRooms}</Text>
              <Text size="sm" color="dimmed">Tổng phòng</Text>
            </Stack>
          </Card>
        </SimpleGrid>
      )}

      <Title order={3} mb="md">Chức năng quản lý</Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 2 }} spacing="lg">
        {adminFunctions.map((func, index) => (
          <Card
            key={index}
            shadow="md"
            padding="lg"
            radius="md"
            withBorder
            sx={{ 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              '&:hover': { 
                backgroundColor: '#f8f9fa',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              } 
            }}
            onClick={() => navigate(func.link)}
          >
            <Group spacing="md">
              <div style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {func.icon}
              </div>
              <div style={{ flex: 1 }}>
                <Title order={4} mb="xs">{func.title}</Title>
                <Text size="sm" color="dimmed">
                  {func.description}
                </Text>
              </div>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default AdminPage;
