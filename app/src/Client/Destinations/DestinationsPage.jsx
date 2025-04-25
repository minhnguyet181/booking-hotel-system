import React from 'react';
import { Container, Title, Text, Grid, Card, Image, Group, Box, Badge } from '@mantine/core';
import Navbar from '../Home/components/Navbar';
import Footer from '../Home/components/Footer';

function DestinationsPage() {
  // Danh sách các điểm đến gần khách sạn
  const destinations = [
    {
      id: 1,
      title: 'Bãi Biển Mỹ Khê',
      description: 'Một trong những bãi biển đẹp nhất thế giới với bờ cát trắng mịn, nước biển trong xanh và hàng dừa xanh mát.',
      distance: '2 km',
      image: '/images/destinations/my-khe-beach.jpg',
      category: 'Bãi biển'
    },
    {
      id: 2,
      title: 'Bán Đảo Sơn Trà',
      description: 'Khu bảo tồn thiên nhiên với hệ sinh thái đa dạng, nơi sinh sống của loài voọc chà vá chân nâu quý hiếm.',
      distance: '7 km',
      image: '/images/destinations/son-tra.jpg',
      category: 'Thiên nhiên'
    },
    {
      id: 3,
      title: 'Ngũ Hành Sơn',
      description: 'Danh thắng nổi tiếng với năm ngọn núi đá vôi, nhiều hang động và chùa chiền cổ kính.',
      distance: '5 km',
      image: '/images/destinations/marble-mountains.jpg',
      category: 'Di tích'
    },
    {
      id: 4,
      title: 'Phố Cổ Hội An',
      description: 'Di sản văn hóa thế giới UNESCO với kiến trúc cổ độc đáo, đèn lồng rực rỡ và ẩm thực đặc sắc.',
      distance: '25 km',
      image: '/images/destinations/hoi-an.jpg',
      category: 'Di sản'
    },
    {
      id: 5,
      title: 'Cù Lao Chàm',
      description: 'Quần đảo xinh đẹp với bãi biển hoang sơ, rạn san hô đa dạng và các hoạt động lặn biển thú vị.',
      distance: '30 km',
      image: '/images/destinations/cham-island.jpg',
      category: 'Đảo'
    },
    {
      id: 6,
      title: 'Bà Nà Hills',
      description: 'Khu du lịch nổi tiếng với Cầu Vàng, làng Pháp và nhiều trò chơi giải trí hấp dẫn.',
      distance: '20 km',
      image: '/images/destinations/ba-na-hills.jpg',
      category: 'Giải trí'
    },
    {
      id: 7,
      title: 'Cố Đô Huế',
      description: 'Kinh đô cũ của Việt Nam với Đại Nội, các lăng tẩm vua chúa và ẩm thực cung đình đặc sắc.',
      distance: '100 km',
      image: '/images/destinations/hue.jpg',
      category: 'Di sản'
    },
    {
      id: 8,
      title: 'Suối Khoáng Nóng Thần Tài',
      description: 'Khu du lịch sinh thái với suối khoáng nóng tự nhiên, công viên nước và không gian xanh mát.',
      distance: '30 km',
      image: '/images/destinations/than-tai-hot-spring.jpg',
      category: 'Sinh thái'
    },
    {
      id: 9,
      title: 'Đèo Hải Vân',
      description: 'Đèo núi hùng vĩ nối liền Đà Nẵng và Huế, được mệnh danh là "thiên hạ đệ nhất hùng quan".',
      distance: '15 km',
      image: '/images/destinations/hai-van-pass.jpg',
      category: 'Cảnh quan'
    }
  ];

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    }}>
      <Navbar />
      
      <Container size="xl" sx={{ marginTop: '80px', marginBottom: '80px' }}>
        <Title sx={{
          fontSize: '36px',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '20px',
          fontFamily: 'Arial, sans-serif',
        }}>
          Khám Phá Điểm Đến
        </Title>
        
        <Text sx={{
          fontSize: '18px',
          textAlign: 'center',
          marginBottom: '60px',
          color: '#6c757d',
          fontFamily: 'Roboto, sans-serif',
        }}>
          Những địa điểm tuyệt vời để khám phá xung quanh H Resort Hotel
        </Text>

        <Grid>
          {destinations.map((destination) => (
            <Grid.Col key={destination.id} span={4} style={{ marginBottom: '30px' }}>
              <Card sx={{
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
                padding: 0,
                overflow: 'hidden',
                height: '100%',
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
                      fontSize: '14px',
                      fontFamily: 'Roboto, sans-serif',
                    }}>
                      {destination.distance}
                    </Badge>
                    <Image
                      src={destination.image}
                      height={220}
                      alt={destination.title}
                      fallbackSrc="https://placehold.co/400x220?text=Điểm+Đến"
                    />
                  </Box>
                </Card.Section>

                <Box sx={{ padding: '20px' }}>
                  <Badge sx={{
                    marginBottom: '10px',
                    backgroundColor: '#e9ecef',
                    color: '#495057',
                    fontWeight: 500,
                  }}>
                    {destination.category}
                  </Badge>
                  
                  <Title sx={{
                    fontSize: '22px',
                    fontWeight: 700,
                    marginTop: '5px',
                    marginBottom: '10px',
                    fontFamily: 'Roboto, sans-serif',
                  }}>{destination.title}</Title>
                  
                  <Text sx={{
                    fontSize: '14px',
                    color: '#6c757d',
                    marginTop: '10px',
                    marginBottom: '10px',
                    fontFamily: 'Roboto, sans-serif',
                    lineHeight: 1.6,
                  }}>
                    {destination.description}
                  </Text>
                </Box>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
      
      <Footer />
    </div>
  );
}

export default DestinationsPage;