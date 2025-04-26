import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, Text, Grid, Card, Group, Badge, Image, Button, Box, Loader } from '@mantine/core';
import Navbar from '../Home/components/Navbar';
import Footer from '../Home/components/Footer';
import api from '../../axios';

function RoomCategoryPage() {
  const { roomTypeSlug } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chuyển đổi slug thành tên loại phòng hiển thị
  const getRoomTypeFromSlug = (slug) => {
    const typeMap = {
      'deluxe': 'Deluxe',
      'suite': 'Suite',
      'standard': 'Tiêu chuẩn',
      'superior': 'Superior',
      'executive': 'Executive',
      'honeymoon-suite': 'Honeymoon Suite',
      'vip': 'VIP',
      'family': 'Gia đình'
    };
    return typeMap[slug] || 'Không xác định';
  };

  // Hiển thị rating dưới dạng sao
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = rating < 4.5 ? 4 : 4.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(fullStars)) {
        // Sao đầy đủ
        stars.push(
          <span key={i} style={{ color: '#f59f00' }}>
            ★
          </span>
        );
      } else if (i === Math.floor(fullStars) && fullStars % 1 !== 0) {
        // Nửa sao (chỉ áp dụng cho 4.5 sao)
        stars.push(
          <span key={i} style={{ color: '#f59f00' }}>
            ★
          </span>
        );
      } else {
        // Sao rỗng
        stars.push(
          <span key={i} style={{ color: '#f59f00' }}>
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  // Format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Hàm xử lý quay lại trang chủ
  const handleBackToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    // Cuộn lên đầu trang khi component được tải
    window.scrollTo(0, 0);
    
    // Gọi API để lấy dữ liệu phòng theo loại
    setLoading(true);
    
    // Lấy roomType từ slug
    const roomType = getRoomTypeFromSlug(roomTypeSlug);
    
    // Gọi API với tham số roomType
    api.get(`/rooms/filter`, { params: { roomType } })
      .then(res => {
        if (res.data && res.data.success) {
          setRooms(res.data.data || []);
        } else {
          setError('Không thể lấy dữ liệu phòng');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Lỗi khi lấy dữ liệu phòng:", err);
        
        // Sử dụng dữ liệu mẫu khi không kết nối được API
        

        const roomType = roomTypeSlug.toLowerCase();
        const roomsData = sampleRoomsByType[roomType] || [];
        
        setRooms(roomsData);
        setLoading(false);
      }, 1000);
  }, [roomTypeSlug]);

  // Hàm xử lý chuyển hướng đến trang chi tiết phòng
  const handleViewDetail = (roomId) => {
    navigate(`/rooms/${roomId}`);
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    }}>
      <Navbar />
      
      <Container size="xl" sx={{ marginTop: '80px', marginBottom: '80px' }}>
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
          Phòng {getRoomTypeFromSlug(roomTypeSlug)}
        </Title>
        
        <Text sx={{
          fontSize: '18px',
          textAlign: 'center',
          marginBottom: '60px',
          color: '#6c757d',
          fontFamily: 'Roboto, sans-serif',
        }}>
          Khám phá các lựa chọn phòng {getRoomTypeFromSlug(roomTypeSlug)} tuyệt vời của chúng tôi
        </Text>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '50px 0' }}>
            <Loader size="xl" color="#f59f00" />
          </Box>
        ) : rooms.length === 0 ? (
          <Text align="center" size="lg">Không tìm thấy phòng nào thuộc loại này</Text>
        ) : (
          <Grid>
            {rooms.map((room) => (
              <Grid.Col key={room._id} span={4} style={{ marginBottom: '30px' }}>
                <Card sx={{
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                  padding: 0,
                  overflow: 'hidden',
                  height: '100%', // Đảm bảo tất cả card có chiều cao 100%
                  display: 'flex',
                  flexDirection: 'column', // Sắp xếp nội dung theo chiều dọc
                }} shadow="sm" radius="md" withBorder>
                  <Card.Section>
                    <Box style={{ position: 'relative' }}>
                      <Badge sx={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        backgroundColor: '#f59f00',
                        color: '#212529',
                        fontWeight: 700,
                        padding: '5px 10px',
                        borderRadius: '4px',
                        zIndex: 2,
                        fontSize: '16px',
                        fontFamily: 'Roboto, sans-serif',
                      }}>
                        {formatPrice(room.price)}
                      </Badge>
                      <Image
                        src={`/images/rooms/${room.images && room.images.length > 0 ? room.images[0] : 'default.jpg'}`}
                        height={220}
                        alt={room.roomName}
                      />
                    </Box>
                  </Card.Section>

                  <Box sx={{ 
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1, // Cho phép box này mở rộng để lấp đầy không gian còn lại
                  }}>
                    <Title sx={{
                      fontSize: '22px',
                      fontWeight: 700,
                      marginTop: '5px',
                      marginBottom: '5px',
                      fontFamily: 'Roboto, sans-serif',
                    }}>{room.roomName}</Title>
                    
                    <Group>{renderRating(room.rating)}</Group>
                    
                    <Text sx={{
                      fontSize: '14px',
                      color: '#6c757d',
                      marginTop: '10px',
                      marginBottom: '10px',
                      fontFamily: 'Roboto, sans-serif',
                      flexGrow: 1, // Cho phép phần mô tả mở rộng
                      height: '80px', // Cố định chiều cao cho phần mô tả
                      overflow: 'hidden', // Ẩn nội dung vượt quá
                      textOverflow: 'ellipsis', // Hiển thị dấu ... khi nội dung bị cắt
                      display: '-webkit-box',
                      WebkitLineClamp: 4, // Giới hạn số dòng hiển thị
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {room.description}
                    </Text>
                    
                    <Group sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#868e96',
                      marginTop: '10px',
                      marginBottom: '5px',
                      fontFamily: 'Roboto, sans-serif',
                    }}>
                      <Text style={{ fontFamily: 'Roboto, sans-serif' }}>🕒 Tối đa {room.capacity} người - {room.area}m²</Text>
                    </Group>

                    <Group position="center" mt="auto" spacing="sm"> {/* Thêm mt="auto" để đẩy các nút xuống dưới cùng */}
                      <Button 
                        variant="outline" 
                        color="blue" 
                        onClick={() => navigate(`/rooms/${room._id}`)}
                        fullWidth
                      >
                        Chi tiết
                      </Button>
                      <Button 
                        color="orange" 
                        onClick={() => navigate(`/booking/${room._id}`)}
                        fullWidth
                      >
                        ĐẶT PHÒNG NGAY
                      </Button>
                    </Group>
                  </Box>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Container>
      
      <Footer />
    </div>
  );
}

export default RoomCategoryPage;