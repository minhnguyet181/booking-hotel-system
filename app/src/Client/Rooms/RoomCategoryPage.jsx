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
      'standard': 'Standard',
      'superior': 'Superior',
      'executive': 'Executive',
      'honeymoon-suite': 'Honeymoon Suite',
      'vip': 'VIP',
      'family': 'Family'
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
    
    // Trong thực tế, bạn sẽ gọi API với tham số roomType
    // api.get(`/rooms?roomType=${getRoomTypeFromSlug(roomTypeSlug)}`)
    
    // Tạm thời sử dụng dữ liệu mẫu
    setTimeout(() => {
      const sampleRoomsByType = {
        'deluxe': [
          {
            _id: '101',
            roomName: 'Phòng Deluxe Hướng Biển',
            rating: 4,
            price: 1800000,
            capacity: 2,
            roomType: 'Deluxe',
            images: ['room1.jpg'],
            description: 'Phòng sang trọng với view biển tuyệt đẹp'
          },
          {
            _id: '102',
            roomName: 'Phòng Deluxe Hướng Vườn',
            rating: 4.2,
            price: 1600000,
            capacity: 2,
            roomType: 'Deluxe',
            images: ['room1.jpg'],
            description: 'Phòng sang trọng với view vườn yên tĩnh'
          },
          {
            _id: '103',
            roomName: 'Phòng Deluxe Góc',
            rating: 4.7,
            price: 2000000,
            capacity: 2,
            roomType: 'Deluxe',
            images: ['room1.jpg'],
            description: 'Phòng góc rộng rãi với tầm nhìn panorama'
          }
        ],
        'suite': [
          {
            _id: '201',
            roomName: 'Phòng Suite Gia Đình',
            rating: 4,
            price: 2500000,
            capacity: 4,
            roomType: 'Suite',
            images: ['room2.jpg'],
            description: 'Phòng rộng rãi dành cho gia đình'
          },
          {
            _id: '202',
            roomName: 'Phòng Honeymoon Suite',
            rating: 5,
            price: 3000000,
            capacity: 2,
            roomType: 'Suite',
            images: ['room6.jpg'],
            description: 'Phòng lãng mạn dành cho cặp đôi'
          },
          {
            _id: '203',
            roomName: 'Phòng Executive Suite',
            rating: 4.8,
            price: 3500000,
            capacity: 2,
            roomType: 'Suite',
            images: ['room2.jpg'],
            description: 'Phòng sang trọng với không gian làm việc'
          }
        ],
        'standard': [
          {
            _id: '301',
            roomName: 'Phòng Standard Đơn',
            rating: 4,
            price: 800000,
            capacity: 1,
            roomType: 'Standard',
            images: ['room3.jpg'],
            description: 'Phòng tiêu chuẩn dành cho 1 người'
          },
          {
            _id: '302',
            roomName: 'Phòng Standard Đôi',
            rating: 4.1,
            price: 1000000,
            capacity: 2,
            roomType: 'Standard',
            images: ['room3.jpg'],
            description: 'Phòng tiêu chuẩn dành cho 2 người'
          }
        ],
        'superior': [
          {
            _id: '401',
            roomName: 'Phòng Superior Đôi',
            rating: 5,
            price: 1200000,
            capacity: 2,
            roomType: 'Superior',
            images: ['room4.jpg'],
            description: 'Phòng cao cấp với giường đôi'
          },
          {
            _id: '402',
            roomName: 'Phòng Superior Twin',
            rating: 4.5,
            price: 1200000,
            capacity: 2,
            roomType: 'Superior',
            images: ['room4.jpg'],
            description: 'Phòng cao cấp với 2 giường đơn'
          }
        ],
        'executive': [
          {
            _id: '501',
            roomName: 'Phòng Executive Hướng Vườn',
            rating: 5,
            price: 2200000,
            capacity: 2,
            roomType: 'Executive',
            images: ['room5.jpg'],
            description: 'Phòng hạng sang với view vườn'
          },
          {
            _id: '502',
            roomName: 'Phòng Executive Hướng Biển',
            rating: 5,
            price: 2500000,
            capacity: 2,
            roomType: 'Executive',
            images: ['room5.jpg'],
            description: 'Phòng hạng sang với view biển'
          }
        ],
        'vip': [
          {
            _id: '601',
            roomName: 'Phòng VIP Penthouse',
            rating: 5,
            price: 5000000,
            capacity: 2,
            roomType: 'VIP',
            images: ['room4.jpg'],
            description: 'Phòng penthouse sang trọng trên tầng cao nhất'
          }
        ],
        'family': [
          {
            _id: '701',
            roomName: 'Phòng Family Kết Nối',
            rating: 4.5,
            price: 3000000,
            capacity: 4,
            roomType: 'Family',
            images: ['room6.jpg'],
            description: 'Hai phòng kết nối dành cho gia đình'
          }
        ]
      };

      const roomType = roomTypeSlug.toLowerCase();
      const roomsData = sampleRoomsByType[roomType] || [];
      
      setRooms(roomsData);
      setLoading(false);
    }, 1000);
  }, [roomTypeSlug]);

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

                  <Box sx={{ padding: '20px' }}>
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
                      <Text style={{ fontFamily: 'Roboto, sans-serif' }}>🕒 Tối đa {room.capacity} người - 30m²</Text>
                    </Group>

                    <Button
                      sx={{
                        backgroundColor: '#f59f00',
                        color: '#212529',
                        '&:hover': {
                          backgroundColor: '#fab005',
                        },
                        marginTop: '15px',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 500,
                      }}
                      fullWidth
                      radius="md"
                    >
                      ĐẶT PHÒNG NGAY
                    </Button>
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