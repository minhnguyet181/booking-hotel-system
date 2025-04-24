import React, { useState } from 'react';
import { Box, Title, Button, Container } from '@mantine/core';

function Banner() {
  // Mảng chứa các ảnh banner
  const bannerImages = [
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1920',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1920',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1920'
  ];

  // State để theo dõi ảnh hiện tại
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hàm chuyển đến ảnh trước đó
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  // Hàm chuyển đến ảnh tiếp theo
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box sx={{
      backgroundImage: `url(${bannerImages[currentImageIndex]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '600px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      marginBottom: '60px',
      transition: 'background-image 0.2s ease',
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
      }} />
      
      {/* Nút điều hướng trái - Đã sửa */}
      <Box 
        onClick={goToPrevious}
        sx={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          backgroundColor: '#f59f00',
          width: '40px',
          height: '40px',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          borderRadius: '4px',
          '&:hover': { backgroundColor: '#fab005' }
        }}
      >
        &lt;
      </Box>
      
      {/* Nút điều hướng phải - Đã sửa */}
      <Box 
        onClick={goToNext}
        sx={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 3,
          backgroundColor: '#f59f00',
          width: '40px',
          height: '40px',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          borderRadius: '4px',
          '&:hover': { backgroundColor: '#fab005' }
        }}
      >
        &gt;
      </Box>
      
      {/* Chỉ báo vị trí ảnh hiện tại */}
      <Box sx={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        zIndex: 3
      }}>
        {bannerImages.map((_, index) => (
          <Box 
            key={index}
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: index === currentImageIndex ? '#f59f00' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </Box>
      
      <Container sx={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Title sx={{
          fontSize: '60px',
          fontWeight: 700,
          marginBottom: '15px',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          fontFamily: 'Playfair Display, serif',
        }}>Enjoy A Luxury</Title>
        <Title sx={{
          fontSize: '60px',
          marginBottom: '60px',
          color: 'white',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          fontFamily: 'Playfair Display, serif',
        }}>Experience</Title>
        
        {/* Nút BOOK NOW mới */}
        <Box
          sx={{
            backgroundColor: '#f59f00',
            color: '#212529',
            fontSize: '18px',
            fontWeight: 600,
            padding: '12px 30px',
            borderRadius: '4px',
            cursor: 'pointer',
            textAlign: 'center',
            display: 'inline-block',
            letterSpacing: '1px',
            '&:hover': {
              backgroundColor: '#fab005',
            },
          }}
        >
          BOOK NOW
        </Box>
      </Container>
    </Box>
  );
}

export default Banner;