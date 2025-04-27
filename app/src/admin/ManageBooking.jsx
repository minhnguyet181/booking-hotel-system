import React, { useState, useEffect } from 'react';
import { Table, Text } from '@mantine/core';
import api from '../axios';

const BookingsManagement = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [confirmedAndCanceledBookings, setConfirmedAndCanceledBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
        try {
          const response = await api.get('/booking');
          const bookings = response.data.bookings; 
          console.log(response.data);
      
          const pending = bookings.filter((booking) => booking.status === 'pending');
          const confirmedAndCanceled = bookings.filter(
            (booking) => booking.status === 'confirmed' || booking.status === 'canceled'
          );
      
          setPendingBookings(pending);
          setConfirmedAndCanceledBookings(confirmedAndCanceled);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      };
      
    fetchBookings();
  }, []);

  const renderStatus = (status) => {
    if (status === 'pending') return <Text color="orange">Chờ xác nhận</Text>;
    if (status === 'confirmed') return <Text color="green">Đã xác nhận</Text>;
    if (status === 'canceled') return <Text color="red">Đã hủy</Text>;
  };

  return (
    <div>
      <h2>Bookings Đang Chờ Xử Lý</h2>
      <Table>
        <thead>
          <tr>
            <th>ID Phòng</th>
            <th>Ngày nhận phòng</th>
            <th>Ngày trả phòng</th>
            <th>Số khách</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {pendingBookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.room}</td>
              <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
              <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
              <td>{booking.numberOfGuests}</td>
              <td>{renderStatus(booking.status)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>Bookings Đã Xác Nhận và Đã Hủy</h2>
      <Table>
        <thead>
          <tr>
            <th>ID Phòng</th>
            <th>Ngày nhận phòng</th>
            <th>Ngày trả phòng</th>
            <th>Số khách</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {confirmedAndCanceledBookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.room}</td>
              <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
              <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
              <td>{booking.numberOfGuests}</td>
              <td>{renderStatus(booking.status)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookingsManagement;
