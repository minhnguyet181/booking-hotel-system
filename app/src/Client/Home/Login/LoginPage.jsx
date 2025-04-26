import React, { useState } from 'react';
import {
  Container,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Notification,
  Box
} from '@mantine/core';
import api from '../../../axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    try {
      const res = await api.post('users/login', { email, password });

      // Lưu thông tin người dùng và token
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // ✅ Điều hướng sau khi đăng nhập thành công
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Đăng nhập thất bại');
    }
  };

  // Thêm hàm xử lý điều hướng về trang chủ
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} align="center" mb="md">Đăng nhập</Title>

        {error && (
          <Notification color="red" title="Lỗi" mb="md">
            {error}
          </Notification>
        )}

        <TextInput
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          required
        />

        <PasswordInput
          label="Mật khẩu"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          required
          mt="md"
        />

        <Button fullWidth mt="xl" onClick={handleLogin}>
          Đăng nhập
        </Button>
        
        {/* Thêm nút trở về trang chủ */}
        <Box mt="md">
          <Button 
            fullWidth 
            variant="outline" 
            color="gray" 
            onClick={handleBackToHome}
          >
            Trở về trang chủ
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;