import React from 'react';
import { Box, Container, Grid, Text, Title, Group } from '@mantine/core';

function Footer() {
  return (
    <Box sx={{
      backgroundColor: '#212529',
      color: 'white',
      paddingTop: '60px',
      paddingBottom: '60px',
      marginTop: '120px',
    }}>
      <Container size="xl">
        <Grid gutter={60}>
          <Grid.Col span={3}>
            <Title sx={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '22px',
              fontWeight: 700,
              marginBottom: '20px',
            }}>H RESORT HOTEL</Title>
            <Text mb="md">Trải nghiệm kỳ nghỉ sang trọng và đẳng cấp tại khách sạn 5 sao của chúng tôi. Với dịch vụ chuyên nghiệp và tiện nghi hiện đại, chúng tôi cam kết mang đến cho bạn những khoảnh khắc đáng nhớ.</Text>
            <Group spacing="xs">
              <Box component="a" href="#" sx={{ color: 'white', fontSize: '20px' }}>
                <span>📱</span>
              </Box>
              <Box component="a" href="#" sx={{ color: 'white', fontSize: '20px' }}>
                <span>📘</span>
              </Box>
              <Box component="a" href="#" sx={{ color: 'white', fontSize: '20px' }}>
                <span>📸</span>
              </Box>
              <Box component="a" href="#" sx={{ color: 'white', fontSize: '20px' }}>
                <span>📺</span>
              </Box>
            </Group>
          </Grid.Col>
          <Grid.Col span={3}>
            <Title sx={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '22px',
              fontWeight: 700,
              marginBottom: '20px',
            }}>Liên kết</Title>
            
            <Text sx={{
              display: 'block',
              color: '#adb5bd',
              marginBottom: '5px',
              '&:hover': {
                color: '#ffe066',
              },
            }}>Dịch vụ</Text>
            <Text sx={{
              display: 'block',
              color: '#adb5bd',
              marginBottom: '5px',
              '&:hover': {
                color: '#ffe066',
              },
            }}>Phòng</Text>
            
            
           
            
          </Grid.Col>
          <Grid.Col span={3}>
            <Title sx={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '22px',
              fontWeight: 700,
              marginBottom: '20px',
            }}>Dịch vụ</Title>
            <Text sx={{
              display: 'block',
              color: '#adb5bd',
              marginBottom: '5px',
              '&:hover': {
                color: '#ffe066',
              },
            }}>Nhà hàng</Text>
            <Text sx={{
              display: 'block',
              color: '#adb5bd',
              marginBottom: '5px',
              '&:hover': {
                color: '#ffe066',
              },
            }}>Spa</Text>
            <Text sx={{
              display: 'block',
              color: '#adb5bd',
              marginBottom: '5px',
              '&:hover': {
                color: '#ffe066',
              },
            }}>Phòng họp</Text>
            <Text sx={{
              display: 'block',
              color: '#adb5bd',
              marginBottom: '5px',
              '&:hover': {
                color: '#ffe066',
              },
            }}>Hồ bơi</Text>
            <Text sx={{
              display: 'block',
              color: '#adb5bd',
              marginBottom: '5px',
              '&:hover': {
                color: '#ffe066',
              },
            }}>Phòng gym</Text>
            <Text sx={{
              display: 'block',
              color: '#adb5bd',
              marginBottom: '5px',
              '&:hover': {
                color: '#ffe066',
              },
            }}>Tour du lịch</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Title sx={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '22px',
              fontWeight: 700,
              marginBottom: '20px',
            }}>Liên hệ</Title>
            <Text sx={{
              display: 'block',
              color: '#adb5bd',
              marginBottom: '5px',
              '&:hover': {
                color: '#ffe066',
              },
            }}>📍Km9 Đ. Nguyễn Trãi, P. Văn Quán, Nam Từ Liêm, Hà Nội</Text>
            <Text sx={{
              display: 'block',
              color: '#adb5bd',
              marginBottom: '5px',
              '&:hover': {
                color: '#ffe066',
              },
            }}>📞 +84 123-456-789</Text>
            <Text sx={{
              display: 'block',
              color: '#adb5bd',
              marginBottom: '5px',
              '&:hover': {
                color: '#ffe066',
              },
            }}>📞 +84 987-654-321</Text>
            <Text sx={{
              display: 'block',
              color: '#adb5bd',
              marginBottom: '5px',
              '&:hover': {
                color: '#ffe066',
              },
            }}>✉️ Hresort@gmail.com</Text>
          </Grid.Col>
        </Grid>
        <Text sx={{
          borderTop: '1px solid #343a40',
          marginTop: '30px',
          paddingTop: '15px',
          color: '#868e96',
          textAlign: 'center',
        }}>
          © {new Date().getFullYear()} H Resort Hotel.
        </Text>
      </Container>
    </Box>
  );
}

export default Footer;