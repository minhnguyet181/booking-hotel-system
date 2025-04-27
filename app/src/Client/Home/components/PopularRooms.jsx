import React from 'react';
import { Title, Text, Card, Group, Grid, Badge, Image, Button, Box, Container } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function PopularRooms({ rooms, loading, error }) {
  const navigate = useNavigate();

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

  // Hàm xử lý chuyển hướng khi nhấn nút "Xem thêm"
  const handleViewMore = (roomType) => {
    // Chuyển đổi tên phòng thành slug URL
    let roomTypeSlug;
    
    // Đảm bảo chuyển đổi đúng định dạng theo mô hình Room.js
    switch(roomType) {
      case 'Deluxe':
        roomTypeSlug = 'deluxe';
        break;
      case 'Suite':
        roomTypeSlug = 'suite';
        break;
      case 'Tiêu chuẩn':
      case 'Standard':
        roomTypeSlug = 'standard';
        break;
      case 'VIP':
        roomTypeSlug = 'vip';
        break;
      case 'Gia đình':
      case 'Family':
        roomTypeSlug = 'family';
        break;
      default:
        roomTypeSlug = roomType.toLowerCase().replace(/ /g, '-');
    }
    
    // Chuyển hướng đến trang loại phòng với slug tương ứng
    navigate(`/rooms/category/${roomTypeSlug}`);
  };

  // Dữ liệu mẫu nếu không có dữ liệu từ API
  const sampleRooms = [
    {
      _id: '1',
      roomName: 'Phòng Deluxe Hướng Biển',
      rating: 4,
      price: 1800000,
      capacity: 2,
      roomType: 'Deluxe',
      images: ['room1.jpg'],
    },
    {
      _id: '2',
      roomName: 'Phòng Suite Gia Đình',
      rating: 4,
      price: 2500000,
      capacity: 4,
      roomType: 'Suite',
      images: ['room2.jpg'],
    },
    {
      _id: '3',
      roomName: 'Phòng Standard Đơn',
      rating: 4,
      price: 800000,
      capacity: 1,
      roomType: 'Standard',
      images: ['room3.jpg'],
    },
    {
      _id: '4',
      roomName: 'Phòng Superior Đôi',
      rating: 5,
      price: 1200000,
      capacity: 2,
      roomType: 'Superior',
      images: ['room4.jpg'],
    },
    {
      _id: '5',
      roomName: 'Phòng Executive Hướng Vườn',
      rating: 5,
      price: 2200000,
      capacity: 2,
      roomType: 'Executive',
      images: ['room5.jpg'],
    },
    {
      _id: '6',
      roomName: 'Phòng Honeymoon Suite',
      rating: 5,
      price: 3000000,
      capacity: 2,
      roomType: 'Suite',
      images: ['room6.jpg'],
    }
  ];

  // Sử dụng dữ liệu mẫu nếu không có dữ liệu từ API
  const displayRooms = (rooms && rooms.length > 0) ? [
    ...(rooms.length >= 1 ? [rooms[0]] : []),
    ...(rooms.length >= 2 ? [rooms[1]] : []),
    ...(rooms.length >= 3 ? [rooms[2]] : []),
    ...(rooms.length >= 13 ? [rooms[12]] : []),
    ...(rooms.length >= 18 ? [rooms[17]] : [])
  ] : sampleRooms;

  return (
    <Container size="xl" sx={{ marginTop: '80px', marginBottom: '80px' }}>
      <Title sx={{
        fontSize: '36px',
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: '60px',
        fontFamily: 'Arial, sans-serif',
      }}>Các phòng nổi bật của chúng tôi</Title>

      {loading ? (
        <Text align="center">Đang tải dữ liệu phòng...</Text>
      ) : error ? (
        <Text align="center" color="red">{error}</Text>
      ) : (
        <Grid>
          {displayRooms.map((room) => (
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
                    onClick={() => handleViewMore(room.roomType)}
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
                    XEM THÊM
                  </Button>
                </Box>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default PopularRooms;