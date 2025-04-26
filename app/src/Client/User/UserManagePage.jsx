import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Card, Group, Box, Loader, Button, TextInput, PasswordInput, Grid, Avatar } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Home/components/Navbar';
import Footer from '../Home/components/Footer';
import api from '../../axios';

function UserManagePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/users');
      return;
    }

    // Lấy thông tin người dùng từ localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      setFormData({
        fullName: userData.fullName || '',
        email: userData.email || '',
        phoneNumber: userData.phoneNumber || '',
        address: userData.address || '',
        password: '',
        confirmPassword: '',
      });
      setLoading(false);
    } else {
      // Nếu không có dữ liệu trong localStorage, gọi API để lấy thông tin
      api.get('/users/profile')
        .then(res => {
          if (res.data && res.data.success) {
            setUser(res.data.data);
            setFormData({
              fullName: res.data.data.fullName || '',
              email: res.data.data.email || '',
              phoneNumber: res.data.data.phoneNumber || '',
              address: res.data.data.address || '',
              password: '',
              confirmPassword: '',
            });
          } else {
            setError('Không thể lấy thông tin người dùng');
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("❌ Lỗi khi lấy thông tin người dùng:", err);
          setError('Đã xảy ra lỗi khi tải thông tin người dùng');
          setLoading(false);
        });
    }
  }, [navigate]);

  // Hàm xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Hàm xử lý cập nhật thông tin người dùng
  const handleUpdate = () => {
    // Kiểm tra mật khẩu nếu có nhập
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setLoading(true);
    
    // Chuẩn bị dữ liệu để gửi lên server
    const updateData = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
    };
    
    // Chỉ gửi mật khẩu nếu người dùng đã nhập
    if (formData.password) {
      updateData.password = formData.password;
    }

    api.put('/users/update', updateData)
      .then(res => {
        if (res.data && res.data.success) {
          // Cập nhật thông tin người dùng trong localStorage
          localStorage.setItem('user', JSON.stringify(res.data.user));
          setUser(res.data.user);
          setEditMode(false);
          setError(null);
        } else {
          setError(res.data?.message || 'Không thể cập nhật thông tin');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Lỗi khi cập nhật thông tin:", err);
        setError(err.response?.data?.message || 'Đã xảy ra lỗi khi cập nhật thông tin');
        setLoading(false);
      });
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
          Thông tin tài khoản
        </Title>
        
        <Text sx={{
          fontSize: '18px',
          textAlign: 'center',
          marginBottom: '40px',
          color: '#6c757d',
          fontFamily: 'Roboto, sans-serif',
        }}>
          Quản lý thông tin cá nhân của bạn tại H Resort Hotel
        </Text>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '50px 0' }}>
            <Loader size="xl" color="#f59f00" />
          </Box>
        ) : error ? (
          <Text align="center" color="red" size="lg">{error}</Text>
        ) : (
          <Card sx={{ padding: '30px' }} shadow="sm" radius="md" withBorder>
            <Grid>
              <Grid.Col span={4}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  padding: '20px'
                }}>
                  <Avatar 
                    size={150} 
                    radius={75} 
                    color="#f59f00"
                    sx={{ marginBottom: '20px' }}
                  >
                    {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                  </Avatar>
                  <Title order={3} sx={{ marginBottom: '10px' }}>
                    {user?.fullName || 'Người dùng'}
                  </Title>
                  <Text color="dimmed">
                    {user?.email || 'Email chưa cập nhật'}
                  </Text>
                </Box>
              </Grid.Col>
              
              <Grid.Col span={8}>
                {editMode ? (
                  <Box>
                    <TextInput
                      label="Họ và tên"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên"
                      sx={{ marginBottom: '15px' }}
                    />
                    
                    <TextInput
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Nhập email"
                      sx={{ marginBottom: '15px' }}
                    />
                    
                    <TextInput
                      label="Số điện thoại"
                      name="phone"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                      sx={{ marginBottom: '15px' }}
                    />
                    
                    <TextInput
                      label="Địa chỉ"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Nhập địa chỉ"
                      sx={{ marginBottom: '15px' }}
                    />
                    
                    <PasswordInput
                      label="Mật khẩu mới (để trống nếu không thay đổi)"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu mới"
                      sx={{ marginBottom: '15px' }}
                    />
                    
                    <PasswordInput
                      label="Xác nhận mật khẩu mới"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Nhập lại mật khẩu mới"
                      sx={{ marginBottom: '25px' }}
                    />
                    
                    <Group position="right">
                      <Button 
                        variant="outline" 
                        color="gray" 
                        onClick={() => setEditMode(false)}
                        sx={{ marginRight: '10px' }}
                      >
                        Hủy
                      </Button>
                      <Button 
                        onClick={handleUpdate}
                        sx={{
                          backgroundColor: '#f59f00',
                          color: '#212529',
                          '&:hover': {
                            backgroundColor: '#fab005',
                          }
                        }}
                      >
                        Lưu thay đổi
                      </Button>
                    </Group>
                  </Box>
                ) : (
                  <Box>
                    <Group sx={{ marginBottom: '15px' }}>
                      <Text weight={600} size="lg" sx={{ width: '150px' }}>Họ và tên:</Text>
                      <Text size="lg">{user?.fullName || 'Chưa cập nhật'}</Text>
                    </Group>
                    
                    <Group sx={{ marginBottom: '15px' }}>
                      <Text weight={600} size="lg" sx={{ width: '150px' }}>Email:</Text>
                      <Text size="lg">{user?.email || 'Chưa cập nhật'}</Text>
                    </Group>
                    
                    <Group sx={{ marginBottom: '15px' }}>
                      <Text weight={600} size="lg" sx={{ width: '150px' }}>Số điện thoại:</Text>
                      <Text size="lg">{user?.phoneNumber || 'Chưa cập nhật'}</Text>
                    </Group>
                    
                    <Group sx={{ marginBottom: '15px' }}>
                      <Text weight={600} size="lg" sx={{ width: '150px' }}>Địa chỉ:</Text>
                      <Text size="lg">{user?.address || 'Chưa cập nhật'}</Text>
                    </Group>
                    
                    <Group sx={{ marginBottom: '15px' }}>
                      <Text weight={600} size="lg" sx={{ width: '150px' }}>Vai trò:</Text>
                      <Text size="lg">{user?.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}</Text>
                    </Group>
                    
                    <Group position="right" sx={{ marginTop: '25px' }}>
                      <Button 
                        onClick={() => setEditMode(true)}
                        sx={{
                          backgroundColor: '#f59f00',
                          color: '#212529',
                          '&:hover': {
                            backgroundColor: '#fab005',
                          }
                        }}
                      >
                        Chỉnh sửa thông tin
                      </Button>
                    </Group>
                  </Box>
                )}
              </Grid.Col>
            </Grid>
          </Card>
        )}
      </Container>
      
      <Footer />
    </div>
  );
}

export default UserManagePage;