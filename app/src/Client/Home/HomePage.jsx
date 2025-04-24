import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import PopularRooms from './components/PopularRooms';
import Footer from './components/Footer';
import api from '../../axios';

function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy dữ liệu phòng từ backend
    api.get('/rooms')
      .then(res => {
        console.log("API response:", res.data); // Thêm log để debug
        if (res.data && res.data.success) {
          setRooms(res.data.data || []);
        } else if (res.data && Array.isArray(res.data)) {
          // Trường hợp API trả về mảng trực tiếp
          setRooms(res.data);
        } else {
          setError(res.data?.message || 'Không thể lấy dữ liệu phòng');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Lỗi khi lấy dữ liệu phòng:", err);
        
        // Tạo dữ liệu mẫu khi không kết nối được API
        const sampleRooms = [
          {
            _id: '1',
            roomNumber: '101',
            roomName: 'Phòng Deluxe Hướng Biển',
            description: 'Phòng sang trọng với view biển tuyệt đẹp',
            amenities: ['WiFi', 'TV', 'Minibar', 'Điều hòa'],
            rating: 4.5,
            images: ['room1.jpg'],
            price: 1800000,
            discountPrice: 0,
            capacity: 2,
            isAvailable: true,
            roomType: 'Deluxe',
            bedType: 'King',
            view: 'Biển',
            floor: 1,
            area: 45
          },
          // Thêm các phòng mẫu khác nếu cần
        ];
        
        setRooms(sampleRooms);
        setError("Không thể kết nối đến server. Hiển thị dữ liệu mẫu.");
        setLoading(false);
        
        showNotification({
          title: 'Lỗi',
          message: 'Không thể kết nối đến server. Hiển thị dữ liệu mẫu.',
          color: 'yellow',
        });
      });
  }, []);

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    }}>
      <Navbar />
      <Banner />
      <PopularRooms rooms={rooms} loading={loading} error={error} />
      <Footer />
    </div>
  );
}

export default HomePage;