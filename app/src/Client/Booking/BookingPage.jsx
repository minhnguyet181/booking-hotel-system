import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Title, Text, Grid, Card, Group, TextInput, 
  Button, Box, Loader, Divider, Select, Textarea, Checkbox, Image
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Navbar from '../Home/components/Navbar';
import Footer from '../Home/components/Footer';
import api from '../../axios';

function BookingPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Kiểm tra authentication khi component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      showNotification({
        title: 'Yêu cầu đăng nhập',
        message: 'Vui lòng đăng nhập để đặt phòng.',
        color: 'yellow',
      });
      navigate('/users');
      return;
    }
  }, [navigate]);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    checkInDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Mặc định là ngày mai
    checkOutDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Mặc định là 2 ngày sau
    checkInTime: '14:00',
    adults: 1,
    children: 0,
    specialRequests: '',
    paymentMethod: 'Thanh toán tại khách sạn khi check-in',
    agreeToTerms: false,
    numberOfGuests:1,
  });

  // Format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Tính tổng số ngày
  const calculateTotalDays = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 1;
    
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays || 1;
  };

  // Tính tổng tiền
  const calculateTotalPrice = () => {
    if (!room) return 0;
    
    const pricePerNight = room.discountPrice || room.price;
    const totalDays = calculateTotalDays();
    
    return pricePerNight * totalDays;
  };

  // Xử lý thay đổi form
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // các phần await api.post(...) phía dưới
  
  
    
    if (!formData.agreeToTerms) {
      showNotification({
        title: 'Lỗi',
        message: 'Vui lòng đồng ý với điều khoản và điều kiện để tiếp tục.',
        color: 'red',
      });
      return;
    }
    
    // Kiểm tra các trường bắt buộc
    if (!formData.fullName || !formData.phone || !formData.email) {
      showNotification({
        title: 'Lỗi',
        message: 'Vui lòng điền đầy đủ thông tin cá nhân.',
        color: 'red',
      });
      return;
    }
    
    // Kiểm tra token trước khi submit
    const token = localStorage.getItem('token');
    if (!token) {
      showNotification({
        title: 'Lỗi',
        message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
        color: 'red',
      });
      navigate('/users');
      return;
    }

    // Chuẩn bị dữ liệu để gửi đi - chỉ gửi các field cần thiết
    const bookingData = {
      room: roomId,
      checkInDate: formData.checkInDate instanceof Date 
        ? formData.checkInDate.toISOString() 
        : new Date(formData.checkInDate).toISOString(),
      checkOutDate: formData.checkOutDate instanceof Date 
        ? formData.checkOutDate.toISOString() 
        : new Date(formData.checkOutDate).toISOString(),
      numberOfGuests: formData.adults + formData.children,
      // Các field khác không cần thiết cho booking model nhưng có thể lưu trong bookingData nếu cần
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
    };

    try {
      const res = await api.post('/booking', bookingData,
        {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

      if (res.data && res.data.success) {
        showNotification({ title: 'Thành công', message: 'Đặt phòng thành công! Vui lòng chờ xác nhận.', color: 'green' });
        navigate('/');
      } else {
        throw new Error(res.data.message || 'Đặt phòng thất bại.');
      }
    } catch (err) {
      console.error('❌ Lỗi đặt phòng:', err);
      showNotification({ title: 'Lỗi', message: err.response?.data?.message || 'Lỗi khi đặt phòng.', color: 'red' });
    }
  };

  useEffect(() => {
    // Cuộn lên đầu trang khi component được tải
    window.scrollTo(0, 0);
    
    // Gọi API để lấy dữ liệu phòng theo ID
    setLoading(true);
    
    api.get(`/rooms/${roomId}`)
      .then(res => {
        if (res.data && res.data.success) {
          setRoom(res.data.data);
        } else {
          setError('Không thể lấy thông tin phòng');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Lỗi khi lấy thông tin phòng:", err);
        
        // Dữ liệu mẫu khi không kết nối được API
        const sampleRoom = {
          _id: roomId,
          roomNumber: '101',
          roomName: 'Phòng Deluxe Hướng Biển',
          description: 'Phòng sang trọng với view biển tuyệt đẹp.',
          amenities: ['WiFi miễn phí', 'TV màn hình phẳng', 'Minibar', 'Điều hòa'],
          rating: 4.5,
          images: ['deluxe1.jpg', 'deluxe2.jpg'],
          price: 1800000,
          discountPrice: 1600000,
          capacity: 2,
          isAvailable: true,
          roomType: 'Deluxe',
          bedType: 'King',
          view: 'Biển',
          floor: 1,
          area: 45
        };
        
        setRoom(sampleRoom);
        setLoading(false);
      });
  }, [roomId]);

  if (loading) {
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', minHeight: '100vh' }}>
        <Navbar />
        <Container size="xl" sx={{ marginTop: '80px', marginBottom: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Loader size="xl" color="#f59f00" />
        </Container>
        <Footer />
      </div>
    );
  }

  if (!room) {
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', minHeight: '100vh' }}>
        <Navbar />
        <Container size="xl" sx={{ marginTop: '80px', marginBottom: '80px', textAlign: 'center' }}>
          <Title>Không tìm thấy phòng</Title>
          <Text color="dimmed" mt="md">Phòng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</Text>
          <Button 
            onClick={() => navigate('/')} 
            mt="xl"
            sx={{
              backgroundColor: '#f59f00',
              color: '#212529',
              '&:hover': {
                backgroundColor: '#fab005',
              }
            }}
          >
            Quay lại trang chủ
          </Button>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar />
      
      <Container size="xl" sx={{ marginTop: '80px', marginBottom: '80px' }}>
        <Title order={1} sx={{ fontSize: '32px', fontWeight: 700, marginBottom: '30px', textAlign: 'center' }}>
          Đặt phòng
        </Title>
        
        <Grid gutter={40}>
          {/* Form đặt phòng - Bên trái */}
          <Grid.Col span={8}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Title order={3} mb="md">Thông tin đặt phòng</Title>
              
              <form onSubmit={handleSubmit}>
                <Grid>
                  <Grid.Col span={12}>
                    <TextInput
                      required
                      label="Họ và tên"
                      placeholder="Nhập họ và tên của bạn"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      mb="md"
                    />
                  </Grid.Col>
                  
                  <Grid.Col span={6}>
                    <TextInput
                      required
                      label="Số điện thoại"
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      mb="md"
                    />
                  </Grid.Col>
                  
                  <Grid.Col span={6}>
                    <TextInput
                      required
                      label="Email"
                      placeholder="Nhập địa chỉ email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      mb="md"
                    />
                  </Grid.Col>
                  
                  <Grid.Col span={6}>
                    <Box mb="md">
                      <Text weight={500} size="sm" mb={5}>Ngày nhận phòng</Text>
                      <input
                        type="date"
                        value={formData.checkInDate instanceof Date ? formData.checkInDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => handleChange('checkInDate', new Date(e.target.value))}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '4px',
                          border: '1px solid #ced4da'
                        }}
                      />
                    </Box>
                  </Grid.Col>
                  
                  <Grid.Col span={6}>
                    <Box mb="md">
                      <Text weight={500} size="sm" mb={5}>Ngày trả phòng</Text>
                      <input
                        type="date"
                        value={formData.checkOutDate instanceof Date ? formData.checkOutDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => handleChange('checkOutDate', new Date(e.target.value))}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '4px',
                          border: '1px solid #ced4da'
                        }}
                      />
                    </Box>
                  </Grid.Col>
                  
                  <Grid.Col span={6}>
                    <Box mb="md">
                      <Text weight={500} size="sm" mb={5}>Giờ nhận phòng</Text>
                      <Select
                        placeholder="Chọn giờ nhận phòng"
                        value={formData.checkInTime}
                        onChange={(value) => handleChange('checkInTime', value)}
                        data={[
                          { value: '14:00', label: '14:00' },
                          { value: '15:00', label: '15:00' },
                          { value: '16:00', label: '16:00' },
                          { value: '17:00', label: '17:00' },
                          { value: '18:00', label: '18:00' },
                          { value: '19:00', label: '19:00' },
                          { value: '20:00', label: '20:00' },
                          { value: '21:00', label: '21:00' },
                          { value: '22:00', label: '22:00' },
                        ]}
                      />
                    </Box>
                  </Grid.Col>
                  
                  <Grid.Col span={3}>
                    <Box mb="md">
                      <Text weight={500} size="sm" mb={5}>Người lớn</Text>
                      <Select
                        placeholder="Số người lớn"
                        value={formData.adults.toString()}
                        onChange={(value) => handleChange('adults', parseInt(value))}
                        data={Array.from({ length: room.capacity }, (_, i) => ({
                          value: (i + 1).toString(),
                          label: (i + 1).toString()
                        }))}
                      />
                    </Box>
                  </Grid.Col>
                  
                  <Grid.Col span={3}>
                    <Box mb="md">
                      <Text weight={500} size="sm" mb={5}>Trẻ em</Text>
                      <Select
                        placeholder="Số trẻ em"
                        value={formData.children.toString()}
                        onChange={(value) => handleChange('children', parseInt(value))}
                        data={Array.from({ length: 4 }, (_, i) => ({
                          value: i.toString(),
                          label: i.toString()
                        }))}
                      />
                    </Box>
                  </Grid.Col>
                  
                  <Grid.Col span={12}>
                    <Textarea
                      label="Yêu cầu đặc biệt"
                      placeholder="Nhập yêu cầu đặc biệt của bạn (nếu có)"
                      value={formData.specialRequests}
                      onChange={(e) => handleChange('specialRequests', e.target.value)}
                      mb="md"
                      minRows={3}
                    />
                  </Grid.Col>
                  
                  <Grid.Col span={12}>
                    <Box mb="md">
                      <Text weight={500} size="sm" mb={5}>Phương thức thanh toán</Text>
                      <Select
                        placeholder="Chọn phương thức thanh toán"
                        value={formData.paymentMethod}
                        onChange={(value) => handleChange('paymentMethod', value)}
                        data={[
                          { value: 'Thanh toán tại khách sạn khi check-in', label: 'Thanh toán tại khách sạn khi check-in' }
                        ]}
                      />
                    </Box>
                  </Grid.Col>
                  
                  <Grid.Col span={12}>
                    <Checkbox
                      label="Tôi đồng ý với điều khoản và điều kiện đặt phòng"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleChange('agreeToTerms', e.currentTarget.checked)}
                      mb="md"
                    />
                  </Grid.Col>
                  
                  <Grid.Col span={12}>
                    <Button
                      type="submit"
                      fullWidth
                      size="lg"
                      disabled={!formData.agreeToTerms}
                      sx={{
                        backgroundColor: formData.agreeToTerms ? '#f59f00' : '#e9ecef',
                        color: formData.agreeToTerms ? '#212529' : '#adb5bd',
                        '&:hover': {
                          backgroundColor: formData.agreeToTerms ? '#fab005' : '#e9ecef',
                        },
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 700,
                        fontSize: '16px',
                        cursor: formData.agreeToTerms ? 'pointer' : 'not-allowed'
                      }}
                    >
                      XÁC NHẬN ĐẶT PHÒNG
                    </Button>
                  </Grid.Col>
                </Grid>
              </form>
            </Card>
          </Grid.Col>
          
          {/* Thông tin phòng - Bên phải */}
          <Grid.Col span={4}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Title order={3} mb="md">Thông tin phòng</Title>
              
              <Box mb="md">
                <Image
                  src={`/images/rooms/${room.images && room.images.length > 0 ? room.images[0] : 'default.jpg'}`}
                  height={200}
                  radius="md"
                  alt={room.roomName}
                />
              </Box>
              
              <Title order={4} mb="xs">{room.roomName}</Title>
              
              <Text size="sm" color="dimmed" mb="md">{room.description}</Text>
              
              <Divider my="md" />
              
              <Box mb="md">
                <Group position="apart">
                  <Text>Loại phòng:</Text>
                  <Text weight={500}>{room.roomType}</Text>
                </Group>
                <Group position="apart">
                  <Text>Loại giường:</Text>
                  <Text weight={500}>{room.bedType}</Text>
                </Group>
                <Group position="apart">
                  <Text>Sức chứa:</Text>
                  <Text weight={500}>Tối đa {room.capacity} người</Text>
                </Group>
                <Group position="apart">
                  <Text>Diện tích:</Text>
                  <Text weight={500}>{room.area}m²</Text>
                </Group>
              </Box>
              
              <Divider my="md" />
              
              <Box mb="md">
                <Group position="apart">
                  <Text>Giá phòng:</Text>
                  <Text weight={500}>{formatPrice(room.discountPrice || room.price)}/đêm</Text>
                </Group>
                <Group position="apart">
                  <Text>Số đêm:</Text>
                  <Text weight={500}>{calculateTotalDays()} đêm</Text>
                </Group>
                <Divider my="sm" />
                <Group position="apart">
                  <Text weight={700}>Tổng tiền:</Text>
                  <Text weight={700} color="#f59f00" size="lg">{formatPrice(calculateTotalPrice())}</Text>
                </Group>
                <Text size="xs" color="dimmed" align="right">Đã bao gồm thuế và phí</Text>
              </Box>
            </Card>
            
            <Card shadow="sm" p="lg" radius="md" withBorder mt="md">
              <Title order={4} mb="md">Chính sách đặt phòng</Title>
              
              <Text size="sm" mb="xs">• Nhận phòng: 14:00, Trả phòng: 12:00</Text>
              <Text size="sm" mb="xs">• Hủy miễn phí trước 7 ngày</Text>
              <Text size="sm" mb="xs">• Đặt cọc: 30% giá trị đơn hàng</Text>
              <Text size="sm" mb="xs">• Trẻ em dưới 6 tuổi: Miễn phí</Text>
              <Text size="sm">• Vật nuôi: Không được phép</Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
      
      <Footer />
    </div>
  );
}

export default BookingPage;