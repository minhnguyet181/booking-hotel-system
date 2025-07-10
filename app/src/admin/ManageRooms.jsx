import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Grid, Card, Group, Badge, Image, Box, Loader, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import api from '../axios';
import { useNavigate } from 'react-router-dom';
import {AiOutlineRollback} from 'react-icons/ai';
function ManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteRoomId, setDeleteRoomId] = useState(null);
  const [confirmOpened, { open, close }] = useDisclosure(false);
  const navigate =useNavigate();
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    setLoading(true);
    api.get('/rooms')
      .then(res => {
        if (res.data && res.data.success) {
          setRooms(res.data.data || []);
        } else {
          console.error('❌ Không thể lấy danh sách phòng');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Lỗi lấy phòng:', err);
        setLoading(false);
      });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleUpdate = (roomId) => {
    alert(`👉 Chuyển đến trang cập nhật phòng với ID: ${roomId}`);
  };

  const handleDeleteConfirm = (roomId) => {
    setDeleteRoomId(roomId);
    open(); // Mở modal xác nhận
  };

  const handleDelete = () => {
    if (!deleteRoomId) return;

    api.delete(`/rooms/${deleteRoomId}`)
      .then(res => {
        if (res.data && res.data.success) {
          // Xóa thành công, load lại danh sách
          fetchRooms();
        } else {
          console.error('❌ Không thể xóa phòng');
        }
      })
      .catch(err => {
        console.error('❌ Lỗi xóa phòng:', err);
      })
      .finally(() => {
        setDeleteRoomId(null);
        close();
      });
  };

  return (
    <Container size="xl" style={{ marginTop: '80px', marginBottom: '80px' }}>
      <Title align="center" style={{ fontSize: '36px', fontWeight: 700, marginBottom: '40px' }}>
        Quản lý danh sách phòng
      </Title>
      <Button
            variant="outline"
            color="gray"
            onClick={() => navigate("/admin")}
            leftIcon={<AiOutlineRollback size={20} />}
      >
        Quay về trang Admin
      </Button>
      {loading ? (
        <Box style={{ display: 'flex', justifyContent: 'center', padding: '50px 0' }}>
          <Loader size="xl" color="#f59f00" />
        </Box>
      ) : (
        <Grid>
          {rooms.map((room) => (
            <Grid.Col key={room._id} span={4} style={{ marginBottom: '30px' }}>
              <Card
                padding={0}
                shadow="sm"
                radius="md"
                withBorder
                style={{
                  transition: 'transform 0.2s',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <Card.Section>
                  <Box style={{ position: 'relative' }}>
                    <Badge
                      style={{
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
                      }}
                    >
                      {formatPrice(room.price)}
                    </Badge>
                    <Image
                      src={`/images/rooms/${room.images && room.images.length > 0 ? room.images[0] : 'default.jpg'}`}
                      height={220}
                      alt={room.roomName}
                    />
                  </Box>
                </Card.Section>

                <Box style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                }}>
                  <Title style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    marginBottom: '10px',
                  }}>
                    {room.roomName}
                  </Title>

                  <Text style={{
                    fontSize: '14px',
                    color: '#6c757d',
                    marginBottom: '10px',
                    flexGrow: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {room.description}
                  </Text>

                  <Group position="center" mt="auto" spacing="sm">
                    <Button color="blue" fullWidth onClick={() => handleUpdate(room._id)}>
                      Chỉnh sửa
                    </Button>
                    <Button color="red" fullWidth onClick={() => handleDeleteConfirm(room._id)}>
                      Xóa
                    </Button>
                  </Group>
                </Box>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      )}

      {/* Modal xác nhận xóa */}
      <Modal
        opened={confirmOpened}
        onClose={close}
        title="Xác nhận"
        centered
      >
        <Text>Bạn có chắc chắn muốn xóa phòng này không?</Text>
        <Group position="apart" mt="md">
          <Button onClick={close} color="gray">Hủy</Button>
          <Button onClick={handleDelete} color="red">Xóa</Button>
        </Group>
      </Modal>
    </Container>
  );
}

export default ManageRooms;
