import React, { useState } from 'react';
import {
  Container,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Notification,
} from '@mantine/core';
import api from '../../../axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ dùng hook navigate

  const handleLogin = async () => {
    setError(null);
    try {
      const res = await api.post('users/login', { email, password });

      // Lưu thông tin người dùng và token
      localStorage.setItem('token', res.data.accessToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      // ✅ Điều hướng sau khi đăng nhập thành công
        // Kiểm tra role
        const role = res.data.user.role;

        if (role === 'admin') {
          navigate('/admin'); // Nếu là admin thì vào trang admin
        } else {
          navigate('/'); // Nếu là user thì về trang chủ
        }
    } catch (err) {
      setError(err.response?.data?.error || 'Đăng nhập thất bại');
    }
  };

  return (
    <Container size="xs" my={40}>
      <Paper withBorder shadow="md" p={30} radius="md">
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
      </Paper>
    </Container>
  );
}

export default LoginPage;