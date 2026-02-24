import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Card, Group, Badge, Box, Loader, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Home/components/Navbar';
import Footer from '../Home/components/Footer';
import api from '../../axios';

function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/users');
      return;
    }

    // Lấy thông báo của người dùng
    api.get('/notifications/my-notifications')  // Đã loại bỏ tiền tố /api
      .then(res => {
        if (res.data && res.data.success) {
          setNotifications(res.data.data || []);
        } else {
          setError('Không thể lấy thông báo');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Lỗi khi lấy thông báo:", err);
        setError('Đã xảy ra lỗi khi tải thông báo');
        setLoading(false);
      });
  }, [navigate]);

  // Hàm đánh dấu thông báo đã đọc
  const handleMarkAsRead = (notificationId) => {
    api.put(`/notifications/${notificationId}/read`)
      .then(res => {
        if (res.data && res.data.success) {
          // Cập nhật trạng thái thông báo trong state
          setNotifications(prevNotifications => 
            prevNotifications.map(notification => 
              notification._id === notificationId 
                ? { ...notification, isRead: true } 
                : notification
            )
          );
        }
      })
      .catch(err => {
        console.error("❌ Lỗi khi đánh dấu thông báo đã đọc:", err);
      });
  };

  // Hàm định dạng thời gian
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Hàm xử lý quay lại trang chủ
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    }}>
      <Navbar />
      
      <Container size="lg" sx={{ marginTop: '80px', marginBottom: '80px' }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px' 
        }}>
          <Button
            onClick={handleBackToHome}
            sx={{
              backgroundColor: '#f59f00',
              color: '#212529',
              '&:hover': {
                backgroundColor: '#fab005',
              },
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 500,
            }}
            radius="md"
          >
            ← Quay lại trang chủ
          </Button>
        </Box>
        
        <Title sx={{
          fontSize: '36px',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
        }}>
          Thông báo của bạn
        </Title>
        
        <Text sx={{
          fontSize: '18px',
          textAlign: 'center',
          marginBottom: '40px',
          color: '#6c757d',
          fontFamily: 'Roboto, sans-serif',
        }}>
          Xem tất cả thông báo và cập nhật từ H Resort Hotel
        </Text>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '50px 0' }}>
            <Loader size="xl" color="#f59f00" />
          </Box>
        ) : error ? (
          <Text align="center" color="red" size="lg">{error}</Text>
        ) : notifications.length === 0 ? (
          <Card sx={{ padding: '30px', textAlign: 'center' }} shadow="sm" radius="md" withBorder>
            <Text size="lg">Bạn chưa có thông báo nào</Text>
          </Card>
        ) : (
          <Box>
            {notifications.map((notification) => (
              <Card 
                key={notification._id} 
                sx={{ 
                  marginBottom: '15px',
                  backgroundColor: notification.isRead ? '#ffffff' : '#fff8e1',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  },
                }} 
                shadow="sm" 
                radius="md" 
                withBorder
              >
                <Group position="apart" sx={{ marginBottom: '10px' }}>
                  <Group>
                    <Text weight={600} size="lg">
                      {notification.isRead ? '' : '🔔 '}
                      Thông báo
                    </Text>
                    {!notification.isRead && (
                      <Badge color="yellow">Mới</Badge>
                    )}
                  </Group>
                  <Text size="sm" color="dimmed">
                    {formatDate(notification.createdAt)}
                  </Text>
                </Group>
                
                <Text sx={{ marginBottom: '15px' }}>
                  {notification.message}
                </Text>
                
                {!notification.isRead && (
                  <Button 
                    variant="light" 
                    color="yellow" 
                    size="xs"
                    onClick={() => handleMarkAsRead(notification._id)}
                  >
                    Đánh dấu đã đọc
                  </Button>
                )}
              </Card>
            ))}
          </Box>
        )}
      </Container>
      
      <Footer />
    </div>
  );
}

export default NotificationsPage;