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

function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Reset các trạng thái
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    // Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      setIsLoading(false);
      return;
    }

    // Kiểm tra các trường bắt buộc
    if (!fullName || !phoneNumber || !address || !email || !birthDate || !password) {
      setError('Vui lòng điền đầy đủ thông tin');
      setIsLoading(false);
      return;
    }

    // Kiểm tra định dạng email cơ bản
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError('Email không hợp lệ');
      setIsLoading(false);
      return;
    }

    try {
      // Gửi yêu cầu đăng ký đến API
      const response = await api.post('users/register', {
        fullName,
        phoneNumber,
        address,
        email,
        birthDate,
        password
      });
      
      // Xử lý phản hồi thành công
      setSuccess('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
      
      // Lưu một số thông tin cơ bản của người dùng vào localStorage
      localStorage.setItem('registeredEmail', email);
      localStorage.setItem('registeredPhone', phoneNumber);
      
      // Tự động chuyển đến trang đăng nhập sau 2 giây
      setTimeout(() => {
        navigate('/login', { state: { registeredEmail: email } });
      }, 2000);
    } catch (err) {
      // Xử lý lỗi
      const errorMessage = err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại sau.';
      setError(errorMessage);
      
      // Log lỗi để gỡ lỗi (trong môi trường phát triển)
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Điều hướng đến trang đăng nhập
  const handleGoToLogin = () => {
    navigate('/login');
  };

  // Điều hướng về trang chủ
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} align="center" mb="md">Đăng ký tài khoản</Title>

        {error && (
          <Notification color="red" title="Lỗi" mb="md" onClose={() => setError(null)}>
            {error}
          </Notification>
        )}

        {success && (
          <Notification color="green" title="Thành công" mb="md" onClose={() => setSuccess(null)}>
            {success}
          </Notification>
        )}

        <TextInput
          label="Họ tên"
          placeholder="Nguyễn Văn A"
          value={fullName}
          onChange={(event) => setFullName(event.currentTarget.value)}
          required
          mb="md"
        />

        <TextInput
          label="Số điện thoại"
          placeholder="0987654321"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.currentTarget.value)}
          required
          mb="md"
        />

        <TextInput
          label="Địa chỉ"
          placeholder="123 Đường ABC, Quận XYZ, TP. HCM"
          value={address}
          onChange={(event) => setAddress(event.currentTarget.value)}
          required
          mb="md"
        />

        <TextInput
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          required
          mb="md"
        />

        <TextInput
          label="Ngày tháng năm sinh"
          placeholder="DD/MM/YYYY"
          value={birthDate}
          onChange={(event) => setBirthDate(event.currentTarget.value)}
          required
          mb="md"
        />

        <PasswordInput
          label="Mật khẩu"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          required
          mt="md"
        />

        <PasswordInput
          label="Xác nhận mật khẩu"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.currentTarget.value)}
          required
          mt="md"
        />

        <Button 
          fullWidth 
          mt="xl" 
          onClick={handleRegister}
          loading={isLoading}
        >
          Đăng ký
        </Button>
        
        <Box mt="md">
          <Button 
            fullWidth 
            variant="outline" 
            onClick={handleGoToLogin}
            mb="md"
            disabled={isLoading}
          >
            Đã có tài khoản? Đăng nhập
          </Button>
          
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

export default RegisterPage;