import { useEffect, useState } from 'react';
import { Container, Title, Button, Text, Card, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import React from 'react';
function App() {
  const [message, setMessage] = useState('');

  axios.get('http://localhost:5000/api/users')
  .then(res => setMessage(res.data.message))
  .catch(err => {
    console.error("❌ Lỗi FE gọi API:", err);
    setMessage('Kết nối thất bại!');
    showNotification({
      title: 'Lỗi',
      message: err.message || 'Không rõ lỗi',
      color: 'red',
    });
  });


  return (
    <Container size="sm" mt="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group position="apart" mb="xs">
          <Title order={2}>Trang chủ Booking Hotel</Title>
        </Group>
        <Text size="sm" color="dimmed">
          Kết nối backend: {message}
        </Text>
        <Button fullWidth mt="md" radius="md" onClick={() => showNotification({ title: 'Hello', message: 'Bạn vừa nhấn nút!' })}>
          Thử tương tác
        </Button>
      </Card>
    </Container>
  );
}

export default App;