import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, Group, Text, Title, Button, ActionIcon, Badge } from '@mantine/core';
import { FaBell, FaSignOutAlt, FaUserFriends } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import api from '../../../axios';

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    
    setIsLoggedIn(token !== null);
    setUser(userData);
    
    if (token) {
      // Lấy số lượng thông báo chưa đọc lần đầu
      fetchUnreadCount();
      
      // Polling để cập nhật real-time notifications mỗi 30 giây
      const interval = setInterval(() => {
        fetchUnreadCount();
      }, 30000); // 30 giây
      
      return () => clearInterval(interval);
    }
  }, []);

  const fetchUnreadCount = () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    api.get('/notifications/unread-count')
      .then(res => {
        if (res.data && res.data.success) {
          setUnreadCount(res.data.count);
        }
      })
      .catch(err => {
        // Không log error nếu là 401/403 (user đã logout)
        if (err.response?.status !== 401 && err.response?.status !== 403) {
          console.error("❌ Lỗi khi lấy số lượng thông báo:", err);
        }
      });
  };

  // Hàm xử lý đăng xuất
  const handleLogout = async () => {
    try {
      // Gọi API logout để invalidate token (nếu có)
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await api.post('/users/logout');
        } catch (err) {
          // Nếu API logout fail, vẫn tiếp tục logout ở client
          console.error('Logout API error:', err);
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Xóa token và user data ở client
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      setUser(null);
      setUnreadCount(0);
      navigate('/');
    }
  };

  return (
    <Box sx={{ position: 'relative', zIndex: 100 }}>
      {/* Header với thông tin liên hệ */}
      <Box sx={{ backgroundColor: '#f8f9fa', padding: '5px 0', fontSize: '12px', borderBottom: '1px solid #e9ecef' }}>
        <Container size="lg">
          <Group position="apart">
            <Group>
              <Text size="xs">
                <span style={{ marginRight: '5px' }}>📧</span>
                GỬI EMAIL CHO CHÚNG TÔI: Hresort@mail.com
              </Text>
            </Group>
            <Group>
              <Text size="xs">
                <span style={{ marginRight: '5px' }}>📞</span>
                CÓ THẮC MẮC? GỌI NGAY: +84 879684732 / +84 093485930
              </Text>
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Navbar chính */}
      <Box sx={{ backgroundColor: '#212529', padding: '10px 0', position: 'relative' }}>
        <Container size="lg">
          <Group position="apart" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
            {/* Nhóm bên trái */}
            <Group spacing="xs" sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
              {!isLoggedIn ? (
                <Button onClick={() => navigate('/users')}>
                  Đăng nhập
                </Button>
              ) : (
                <Group spacing="xs">
                  {user?.role === 'admin' && (
                    <Button 
                      variant="subtle" 
                      color="yellow"
                      onClick={() => navigate('/admin')}
                      sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                    >
                      Admin
                    </Button>
                  )}
                  <ActionIcon 
                    color="white" 
                    variant="transparent" 
                    onClick={() => navigate('/userManage')}
                    title="Quản lý tài khoản"
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    <FaUserFriends size={20} />
                  </ActionIcon>
                  <Box sx={{ position: 'relative' }}>
                    <ActionIcon 
                      color="white" 
                      variant="transparent" 
                      onClick={() => navigate('/notifications')}
                      title="Thông báo"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.2s',
                      }}
                    >
                      <FaBell size={20} />
                    </ActionIcon>
                    {unreadCount > 0 && (
                      <Badge 
                        sx={{ 
                          position: 'absolute', 
                          top: -5, 
                          right: -5,
                          backgroundColor: '#f59f00',
                          color: '#212529',
                          animation: unreadCount > 0 ? 'pulse 2s infinite' : 'none',
                          '@keyframes pulse': {
                            '0%, 100%': { opacity: 1 },
                            '50%': { opacity: 0.7 },
                          },
                        }} 
                        size="xs" 
                        variant="filled"
                      >
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </Badge>
                    )}
                  </Box>
                  <ActionIcon 
                    color="white" 
                    variant="transparent" 
                    onClick={handleLogout}
                    title="Đăng xuất"
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    <FaSignOutAlt size={20} />
                  </ActionIcon>
                </Group>
              )}
              <Text size="m" sx={{ fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', color: 'white', '&:hover': { color: '#f59f00' } }}
                    onClick={() => navigate('/')}>
                TRANG CHỦ
              </Text>
              <Text size="m" sx={{ fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', color: 'white', '&:hover': { color: '#f59f00' } }}
                    onClick={() => navigate('/activities')}>
                HOẠT ĐỘNG
              </Text>
              <Text size="m" sx={{ fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', color: 'white', '&:hover': { color: '#f59f00' } }}
                    onClick={() => navigate('/destinations')}>
                ĐIỂM ĐẾN
              </Text>
            </Group>

            {/* Logo ở giữa - đã phóng to chữ H */}
            <Title sx={{ fontSize: '22px', fontWeight: 700, fontFamily: 'Playfair Display, serif', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap', margin: '0 15px', color: 'white' }}>
              <span style={{ fontSize: '70px', marginRight: '5px', color: '#f59f00' }}>H</span>
              RESORT HOTEL
            </Title>

            {/* Nhóm bên phải */}
            <Group spacing="xs" sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
              <Text size="m" sx={{ fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', color: 'white', '&:hover': { color: '#f59f00' } }}>
                BLOG
              </Text>
              <Text size="m" sx={{ fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', color: 'white', '&:hover': { color: '#f59f00' } }}>
                TRANG
              </Text>
              <Text size="m" sx={{ fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', color: 'white', '&:hover': { color: '#f59f00' } }}>
                GIỚI THIỆU
              </Text>
              <Text size="m" sx={{ fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', color: 'white', '&:hover': { color: '#f59f00' } }}>
                LIÊN HỆ
              </Text>
              
            </Group>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}

export default Navbar;
