import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Notification,
  Box,
  Group,
  Checkbox
} from '@mantine/core';
import api from '../../../axios';
import { useNavigate, useLocation } from 'react-router-dom';

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Lấy email từ state router hoặc localStorage nếu có
  const registeredEmail = location.state?.registeredEmail || localStorage.getItem('registeredEmail') || '';
  
  const [email, setEmail] = useState(registeredEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Xóa thông báo lỗi khi người dùng thay đổi input
  useEffect(() => {
    if (error) setError(null);
  }, [email, password]);

  const handleLogin = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      const res = await api.post('users/login', { email, password });
  
      const { user, accessToken } = res.data.data;
  
      // Lưu token và user
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Nếu "Ghi nhớ đăng nhập" được chọn, lưu email
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      // Xóa dữ liệu đăng ký tạm thời
      localStorage.removeItem('registeredEmail');
      localStorage.removeItem('registeredPhone');
  
      const role = user.role;
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Xử lý khi nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // Điều hướng đến trang đăng ký
  const handleGoToRegister = () => {
    navigate('/register');
  };

  // Điều hướng về trang chủ
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} align="center" mb="md">Đăng nhập</Title>

        {error && (
          <Notification color="red" title="Lỗi" mb="md" onClose={() => setError(null)}>
            {error}
          </Notification>
        )}

        <TextInput
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          onKeyPress={handleKeyPress}
          required
          mb="md"
        />

        <PasswordInput
          label="Mật khẩu"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          onKeyPress={handleKeyPress}
          required
          mt="md"
        />

        <Group position="apart" mt="lg">
          <Checkbox
            label="Ghi nhớ đăng nhập"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.currentTarget.checked)}
          />
        </Group>

        <Button 
          fullWidth 
          mt="xl" 
          onClick={handleLogin}
          loading={isLoading}
        >
          Đăng nhập
        </Button>
        
        <Button 
          fullWidth 
          variant="outline" 
          color="blue" 
          onClick={handleGoToRegister}
          mt="md"
          disabled={isLoading}
        >
          Đăng ký tài khoản
        </Button>
        
        <Box mt="md">
          <Button 
            fullWidth 
            variant="outline" 
            color="gray" 
            onClick={handleBackToHome}
            disabled={isLoading}
          >
            Trở về trang chủ
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;