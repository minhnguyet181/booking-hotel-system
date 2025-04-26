import React from 'react';
import { Box, Container, Group, Text, Title, Button, ActionIcon } from '@mantine/core';
import { FaBell, FaSignOutAlt, FaUserFriends } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token'); // 👈 Kiểm tra token để biết đăng nhập chưa

  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token
    navigate('/login'); // Điều hướng về login
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
              {!token ? (
                <Button onClick={() => navigate('/users')}>
                  Đăng nhập
                </Button>
              ) : (
                <Group spacing="xs">
                  <ActionIcon color="white" variant="transparent" onClick={() => navigate('/userManage')}>
                    <FaUserFriends size={20} />
                  </ActionIcon>
                  <ActionIcon color="white" variant="transparent" onClick={() => navigate('/notifications')}>
                    <FaBell size={20} />
                  </ActionIcon>
                  <ActionIcon color="white" variant="transparent" onClick={handleLogout}>
                    <FaSignOutAlt size={20} />
                  </ActionIcon>
                </Group>
              )}
              <Text size="xs" sx={{ fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', color: 'white', '&:hover': { color: '#f59f00' } }}
                    onClick={() => navigate('/')}>
                TRANG CHỦ
              </Text>
              <Text size="xs" sx={{ fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', color: 'white', '&:hover': { color: '#f59f00' } }}
                    onClick={() => navigate('/activities')}>
                HOẠT ĐỘNG
              </Text>
              <Text size="xs" sx={{ fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', color: 'white', '&:hover': { color: '#f59f00' } }}
                    onClick={() => navigate('/destinations')}>
                ĐIỂM ĐẾN
              </Text>
            </Group>

            {/* Logo ở giữa */}
            <Title sx={{ fontSize: '22px', fontWeight: 700, fontFamily: 'Playfair Display, serif', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap', margin: '0 15px', color: 'white' }}>
              <span style={{ fontSize: '28px', marginRight: '5px' }}>H</span>
              RESORT HOTEL
            </Title>

            {/* Nhóm bên phải */}
            <Group spacing="xs" sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
              <Text size="xs" sx={{ fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', color: 'white', '&:hover': { color: '#f59f00' } }}>
                BLOG
              </Text>
              <Text size="xs" sx={{ fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', color: 'white', '&:hover': { color: '#f59f00' } }}>
                TRANG
              </Text>
              <Text size="xs" sx={{ fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', color: 'white', '&:hover': { color: '#f59f00' } }}>
                GIỚI THIỆU
              </Text>
              <Text size="xs" sx={{ fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap', color: 'white', '&:hover': { color: '#f59f00' } }}>
                LIÊN HỆ
              </Text>
              <Button size="xs" variant="filled" sx={{ backgroundColor: '#f59f00', padding: '0 10px', height: '25px', '&:hover': { backgroundColor: '#fab005' } }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </Button>
            </Group>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}

export default Navbar;
