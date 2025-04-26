import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Title, Text, Grid, Card, Group, Badge, Image, 
  Button, Box, Loader, List, Divider, Tabs, ActionIcon
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import Navbar from '../Home/components/Navbar';
import Footer from '../Home/components/Footer';
import api from '../../axios';

function RoomDetailPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add the handleBookNow function
  const handleBookNow = () => {
    navigate(`/booking/${roomId}`);
  };

  // Hiển thị rating dưới dạng sao
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Sao đầy đủ
        stars.push(
          <span key={i} style={{ color: '#f59f00', fontSize: '24px' }}>
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        // Nửa sao
        stars.push(
          <span key={i} style={{ color: '#f59f00', fontSize: '24px' }}>
            ★
          </span>
        );
      } else {
        // Sao rỗng
        stars.push(
          <span key={i} style={{ color: '#f59f00', fontSize: '24px' }}>
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

  // Hàm xử lý quay lại trang danh sách phòng
  const handleBackToCategory = () => {
    const roomTypeSlug = getRoomTypeSlug(room?.roomType);
    navigate(`/rooms/category/${roomTypeSlug}`);
  };

  // Chuyển đổi loại phòng thành slug
  const getRoomTypeSlug = (roomType) => {
    if (!roomType) return 'standard';
    
    const typeMap = {
      'Deluxe': 'deluxe',
      'Suite': 'suite',
      'Tiêu chuẩn': 'standard',
      'Superior': 'superior',
      'Executive': 'executive',
      'VIP': 'vip',
      'Gia đình': 'family'
    };
    return typeMap[roomType] || roomType.toLowerCase().replace(/ /g, '-');
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
          description: 'Phòng sang trọng với view biển tuyệt đẹp, được thiết kế tinh tế với không gian rộng rãi và ánh sáng tự nhiên. Phòng được trang bị đầy đủ tiện nghi hiện đại, mang đến trải nghiệm nghỉ dưỡng tuyệt vời cho quý khách.',
          amenities: ['WiFi miễn phí', 'TV màn hình phẳng', 'Minibar', 'Điều hòa', 'Két an toàn', 'Bàn làm việc', 'Máy sấy tóc', 'Áo choàng tắm', 'Dép đi trong phòng'],
          rating: 4.5,
          images: ['deluxe1.jpg', 'deluxe2.jpg', 'deluxe3.jpg', 'deluxe4.jpg'],
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
        setError("Không thể kết nối đến server. Hiển thị dữ liệu mẫu.");
        setLoading(false);
        
        showNotification({
          title: 'Lỗi',
          message: 'Không thể kết nối đến server. Hiển thị dữ liệu mẫu.',
          color: 'yellow',
        });
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
            onClick={handleBackToCategory}
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
            ← Quay lại danh sách phòng
          </Button>
        </Box>
        
        {error && (
          <Text color="red" mb="md" align="center">{error}</Text>
        )}

        <Grid gutter={40}>
          {/* Phần hình ảnh phòng - Bên trái */}
          <Grid.Col span={7}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={`/images/rooms/${room.images && room.images.length > 0 ? room.images[0] : 'default.jpg'}`}
                  height={400}
                  alt={room.roomName}
                />
              </Card.Section>
              
              {/* Hiển thị các hình ảnh nhỏ */}
              <Group position="center" spacing="xs" mt="md">
                {room.images && room.images.map((img, index) => (
                  <Box 
                    key={index}
                    sx={{
                      width: '80px',
                      height: '60px',
                      overflow: 'hidden',
                      borderRadius: '4px',
                      border: '2px solid #f59f00',
                      cursor: 'pointer'
                    }}
                  >
                    <Image
                      src={`/images/rooms/${img}`}
                      height={60}
                      width={80}
                      fit="cover"
                      alt={`${room.roomName} - Ảnh ${index + 1}`}
                    />
                  </Box>
                ))}
              </Group>
            </Card>
          </Grid.Col>
          
          {/* Thông tin phòng - Bên phải */}
          <Grid.Col span={5}>
            <Title order={1} sx={{ fontSize: '32px', fontWeight: 700, marginBottom: '10px' }}>
              {room.roomName}
            </Title>
            
            <Group spacing="xs" mb="md">
              {renderRating(room.rating)}
              <Text size="sm" color="dimmed">({room.rating}/5)</Text>
            </Group>
            
            <Box mb="md">
              <Group position="apart">
                <Text size="xl" weight={700} color="#f59f00">
                  {formatPrice(room.discountPrice || room.price)}
                </Text>
                {room.discountPrice && (
                  <Text size="md" color="dimmed" style={{ textDecoration: 'line-through' }}>
                    {formatPrice(room.price)}
                  </Text>
                )}
              </Group>
              <Text size="sm" color="dimmed">Giá cho 1 đêm, đã bao gồm thuế và phí</Text>
            </Box>
            
            <Divider my="md" />
            
            <Box mb="md">
              <Text weight={600} mb="xs">Thông tin phòng:</Text>
              <Group spacing="xl">
                <Box>
                  <Text size="sm">🛏️ {room.bedType}</Text>
                  <Text size="sm">👥 Tối đa {room.capacity} người</Text>
                </Box>
                <Box>
                  <Text size="sm">🏙️ View {room.view}</Text>
                  <Text size="sm">📏 {room.area}m²</Text>
                </Box>
              </Group>
            </Box>
            
            <Box mb="md">
              <Text weight={600} mb="xs">Mô tả:</Text>
              <Text size="sm">{room.description}</Text>
            </Box>
            
            <Box mb="xl">
              <Text weight={600} mb="xs">Tiện nghi:</Text>
              <Grid>
                {room.amenities && room.amenities.map((amenity, index) => (
                  <Grid.Col key={index} span={6}>
                    <Text size="sm">✓ {amenity}</Text>
                  </Grid.Col>
                ))}
              </Grid>
            </Box>
            
            <Button
              onClick={handleBookNow}
              fullWidth
              size="lg"
              sx={{
                backgroundColor: '#f59f00',
                color: '#212529',
                '&:hover': {
                  backgroundColor: '#fab005',
                },
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                fontSize: '16px'
              }}
            >
              ĐẶT PHÒNG NGAY
            </Button>
          </Grid.Col>
        </Grid>
        
        {/* Thông tin chi tiết và đánh giá */}
        <Box mt={60}>
          <Tabs defaultValue="details">
            <Tabs.List>
              <Tabs.Tab value="details" sx={{ fontSize: '16px', fontWeight: 500 }}>Chi tiết phòng</Tabs.Tab>
              <Tabs.Tab value="policies" sx={{ fontSize: '16px', fontWeight: 500 }}>Chính sách</Tabs.Tab>
              <Tabs.Tab value="reviews" sx={{ fontSize: '16px', fontWeight: 500 }}>Đánh giá</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="details" pt="xs" sx={{ padding: '20px 0' }}>
              <Text mb="md">Phòng {room.roomName} của chúng tôi được thiết kế để mang đến sự thoải mái và sang trọng tối đa cho quý khách. Với diện tích {room.area}m², phòng có đầy đủ không gian để quý khách thư giãn và nghỉ ngơi.</Text>
              
              <Title order={4} mb="sm">Tiện nghi phòng</Title>
              <Grid mb="xl">
                {room.amenities && room.amenities.map((amenity, index) => (
                  <Grid.Col key={index} span={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Text size="md">✓ {amenity}</Text>
                    </Box>
                  </Grid.Col>
                ))}
              </Grid>
              
              <Title order={4} mb="sm">Thông tin thêm</Title>
              <List spacing="xs">
                <List.Item>Check-in: 14:00</List.Item>
                <List.Item>Check-out: 12:00</List.Item>
                <List.Item>Bữa sáng: Miễn phí</List.Item>
                <List.Item>Wifi: Miễn phí</List.Item>
                <List.Item>Hút thuốc: Không</List.Item>
                <List.Item>Vật nuôi: Không được phép</List.Item>
              </List>
            </Tabs.Panel>

            <Tabs.Panel value="policies" pt="xs" sx={{ padding: '20px 0' }}>
              <Title order={4} mb="sm">Chính sách đặt phòng</Title>
              <List spacing="xs" mb="xl">
                <List.Item>Đặt cọc: 30% giá trị đơn hàng</List.Item>
                <List.Item>Hủy trước 7 ngày: Hoàn tiền 100% tiền cọc</List.Item>
                <List.Item>Hủy trước 3-7 ngày: Hoàn tiền 50% tiền cọc</List.Item>
                <List.Item>Hủy trong vòng 3 ngày: Không hoàn tiền cọc</List.Item>
              </List>
              
              <Title order={4} mb="sm">Chính sách khách sạn</Title>
              <List spacing="xs">
                <List.Item>Trẻ em dưới 6 tuổi: Miễn phí khi ở cùng bố mẹ</List.Item>
                <List.Item>Trẻ em từ 6-12 tuổi: Phụ thu 300.000 VNĐ/đêm</List.Item>
                <List.Item>Người lớn thứ 3: Phụ thu 500.000 VNĐ/đêm</List.Item>
                <List.Item>Giường phụ: 400.000 VNĐ/đêm (tùy thuộc vào tình trạng phòng)</List.Item>
              </List>
            </Tabs.Panel>

            <Tabs.Panel value="reviews" pt="xs" sx={{ padding: '20px 0' }}>
              <Title order={4} mb="md">Đánh giá từ khách hàng</Title>
              
              <Box mb="xl">
                <Group position="apart" mb="xs">
                  <Group>
                    <Text weight={600}>Nguyễn Văn A</Text>
                    <Text size="sm" color="dimmed">12/05/2023</Text>
                  </Group>
                  <Group>{renderRating(5).slice(0, 5)}</Group>
                </Group>
                <Text size="sm">Phòng rất thoải mái và sạch sẽ. Nhân viên phục vụ nhiệt tình, view biển tuyệt đẹp. Tôi sẽ quay lại vào lần sau!</Text>
              </Box>
              
              <Box mb="xl">
                <Group position="apart" mb="xs">
                  <Group>
                    <Text weight={600}>Trần Thị B</Text>
                    <Text size="sm" color="dimmed">28/04/2023</Text>
                  </Group>
                  <Group>{renderRating(4).slice(0, 4)}</Group>
                </Group>
                <Text size="sm">Phòng đẹp, tiện nghi đầy đủ. Chỉ tiếc là hơi ồn vào buổi sáng do đang có công trình xây dựng gần đó.</Text>
              </Box>
              
              <Box>
                <Group position="apart" mb="xs">
                  <Group>
                    <Text weight={600}>Lê Văn C</Text>
                    <Text size="sm" color="dimmed">15/03/2023</Text>
                  </Group>
                  <Group>{renderRating(5).slice(0, 5)}</Group>
                </Group>
                <Text size="sm">Tuyệt vời! Đồ ăn ngon, phòng sạch sẽ, nhân viên thân thiện. Đặc biệt là view biển từ phòng rất đẹp, nhất là vào buổi bình minh.</Text>
              </Box>
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Container>
      
      <Footer />
    </div>
  );
}

export default RoomDetailPage;