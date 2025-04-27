import React from 'react';
import { Container, Title, Text, Grid, Card, Image, Group, Box } from '@mantine/core';
import Navbar from '../Home/components/Navbar';
import Footer from '../Home/components/Footer';

function ActivitiesPage() {
  // Danh sách các hoạt động của khách sạn
  const activities = [
    {
      id: 1,
      title: 'Bơi lội',
      description: 'Hồ bơi vô cực với tầm nhìn toàn cảnh biển, mở cửa từ 6:00 đến 22:00 hàng ngày.',
      image: '/images/activities/swimming.jpg'
    },
    {
      id: 2,
      title: 'Spa & Massage',
      description: 'Dịch vụ spa cao cấp với các liệu pháp truyền thống và hiện đại, giúp thư giãn toàn thân.',
      image: '/images/activities/spa.jpg'
    },
    {
      id: 3,
      title: 'Phòng Gym',
      description: 'Phòng tập hiện đại với đầy đủ thiết bị, mở cửa 24/7 dành cho khách lưu trú.',
      image: '/images/activities/gym.jpg'
    },
    {
      id: 4,
      title: 'Nhà Hàng',
      description: 'Nhà hàng phục vụ ẩm thực Việt Nam và quốc tế, với view biển tuyệt đẹp.',
      image: '/images/activities/restaurant.jpg'
    },
    {
      id: 5,
      title: 'Bar & Lounge',
      description: 'Thưởng thức đồ uống và cocktail đặc biệt trong không gian sang trọng với âm nhạc sống.',
      image: '/images/activities/bar.jpg'
    },
    {
      id: 6,
      title: 'Tour Du Lịch',
      description: 'Dịch vụ tổ chức tour tham quan các điểm du lịch nổi tiếng trong khu vực.',
      image: '/images/activities/tour.jpg'
    },
    {
      id: 7,
      title: 'Thể Thao Biển',
      description: 'Các hoạt động thể thao biển như lướt sóng, chèo thuyền kayak, lặn biển...',
      image: '/images/activities/water-sports.jpg'
    },
    {
      id: 8,
      title: 'Tiệc BBQ Bãi Biển',
      description: 'Tổ chức tiệc nướng BBQ trên bãi biển với không gian riêng tư và dịch vụ phục vụ chuyên nghiệp.',
      image: '/images/activities/bbq.jpg'
    },
    {
      id: 9,
      title: 'Yoga Buổi Sáng',
      description: 'Lớp yoga buổi sáng trên bãi biển hoặc trong vườn, giúp cân bằng thể chất và tinh thần.',
      image: '/images/activities/yoga.jpg'
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
          Hoạt Động & Tiện Ích
        </Title>
        
        <Text sx={{
          fontSize: '18px',
          textAlign: 'center',
          marginBottom: '60px',
          color: '#6c757d',
          fontFamily: 'Roboto, sans-serif',
        }}>
          Khám phá các hoạt động và tiện ích đa dạng tại H Resort Hotel
        </Text>

        <Grid>
          {activities.map((activity) => (
            <Grid.Col key={activity.id} span={4} style={{ marginBottom: '30px' }}>
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
                  <Image
                    src={activity.image}
                    height={220}
                    alt={activity.title}
                    fallbackSrc="https://placehold.co/400x220?text=Hoạt+Động"
                  />
                </Card.Section>

                <Box sx={{ padding: '20px' }}>
                  <Title sx={{
                    fontSize: '22px',
                    fontWeight: 700,
                    marginTop: '5px',
                    marginBottom: '10px',
                    fontFamily: 'Roboto, sans-serif',
                  }}>{activity.title}</Title>
                  
                  <Text sx={{
                    fontSize: '14px',
                    color: '#6c757d',
                    marginTop: '10px',
                    marginBottom: '10px',
                    fontFamily: 'Roboto, sans-serif',
                    lineHeight: 1.6,
                  }}>
                    {activity.description}
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

export default ActivitiesPage;