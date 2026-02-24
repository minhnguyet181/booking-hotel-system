import React, { useEffect, useState } from 'react';
import { 
  Container, Title, Text, Grid, Card, Group, Badge, Image, Box, Loader, 
  Button, Modal, TextInput, NumberInput, Select, Textarea, MultiSelect, 
  Switch, Alert, Stack
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import api from '../axios';
import { useNavigate } from 'react-router-dom';
import {AiOutlineRollback} from 'react-icons/ai';
function ManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteRoomId, setDeleteRoomId] = useState(null);
  const [confirmOpened, { open, close }] = useDisclosure(false);
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
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

  const handleUpdate = async (roomId) => {
    try {
      const res = await api.get(`/rooms/${roomId}`);
      if (res.data && res.data.success) {
        const room = res.data.data;
        setSelectedRoom(room);
        setFormData({
          roomNumber: room.roomNumber || '',
          roomName: room.roomName || '',
          description: room.description || '',
          price: room.price || 0,
          discountPrice: room.discountPrice || 0,
          capacity: room.capacity || 1,
          roomType: room.roomType || 'Tiêu chuẩn',
          bedType: room.bedType || 'Đơn',
          view: room.view || 'Không',
          floor: room.floor || 1,
          area: room.area || 0,
          isAvailable: room.isAvailable !== undefined ? room.isAvailable : true,
          amenities: room.amenities || [],
          rating: room.rating || 0,
        });
        openEdit();
      }
    } catch (error) {
      console.error('Error fetching room:', error);
      setNotification({ type: 'error', message: 'Không thể tải thông tin phòng' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleSaveRoom = async () => {
    try {
      setSaving(true);
      if (selectedRoom && selectedRoom._id) {
        // Update existing room
        await api.put(`/rooms/${selectedRoom._id}`, formData);
        setNotification({ type: 'success', message: 'Cập nhật phòng thành công!' });
        closeEdit();
      } else {
        // Create new room
        await api.post(`/rooms`, formData);
        setNotification({ type: 'success', message: 'Tạo phòng mới thành công!' });
        closeAdd();
        setFormData({});
      }
      fetchRooms();
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Error saving room:', error);
      setNotification({ 
        type: 'error', 
        message: error.response?.data?.message || 'Lỗi khi lưu phòng' 
      });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setFormData({
      roomNumber: '',
      roomName: '',
      description: '',
      price: 0,
      discountPrice: 0,
      capacity: 1,
      roomType: 'Tiêu chuẩn',
      bedType: 'Đơn',
      view: 'Không',
      floor: 1,
      area: 0,
      isAvailable: true,
      amenities: [],
      rating: 0,
    });
    openAdd();
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
          setNotification({ type: 'success', message: 'Xóa phòng thành công!' });
          fetchRooms();
          setTimeout(() => setNotification(null), 3000);
        } else {
          setNotification({ type: 'error', message: 'Không thể xóa phòng' });
          setTimeout(() => setNotification(null), 3000);
        }
      })
      .catch(err => {
        console.error('❌ Lỗi xóa phòng:', err);
        setNotification({ 
          type: 'error', 
          message: err.response?.data?.message || 'Lỗi khi xóa phòng' 
        });
        setTimeout(() => setNotification(null), 3000);
      })
      .finally(() => {
        setDeleteRoomId(null);
        close();
      });
  };

  const commonAmenities = [
    'WiFi miễn phí', 'Điều hòa', 'TV', 'Minibar', 'Bồn tắm', 
    'Vòi sen', 'Ban công', 'Tủ lạnh', 'Máy pha cà phê', 
    'Bàn làm việc', 'Két an toàn', 'Dịch vụ phòng', 'Thang máy'
  ];

  return (
    <Container size="xl" style={{ marginTop: '80px', marginBottom: '80px' }}>
      {notification && (
        <Alert 
          color={notification.type === 'success' ? 'green' : 'red'} 
          title={notification.type === 'success' ? 'Thành công' : 'Lỗi'}
          mb="md"
          onClose={() => setNotification(null)}
          withCloseButton
        >
          {notification.message}
        </Alert>
      )}

      <Group position="apart" mb="md">
        <Title style={{ fontSize: '36px', fontWeight: 700 }}>
          Quản lý danh sách phòng
        </Title>
        <Group>
          <Button
            variant="outline"
            color="gray"
            onClick={() => navigate("/admin")}
            leftIcon={<AiOutlineRollback size={20} />}
          >
            Quay về trang Admin
          </Button>
          <Button
            color="blue"
            onClick={handleAddRoom}
          >
            + Thêm phòng mới
          </Button>
        </Group>
      </Group>
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
        title="Xác nhận xóa phòng"
        centered
        size="md"
      >
        <Text mb="md">Bạn có chắc chắn muốn xóa phòng này không? Hành động này không thể hoàn tác.</Text>
        <Group position="right" mt="md">
          <Button onClick={close} color="gray" variant="outline">Hủy</Button>
          <Button onClick={handleDelete} color="red">Xóa</Button>
        </Group>
      </Modal>

      {/* Modal thêm phòng mới */}
      <Modal
        opened={addOpened}
        onClose={closeAdd}
        title="Thêm phòng mới"
        centered
        size="xl"
      >
        <Stack spacing="md">
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Số phòng"
                value={formData.roomNumber || ''}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Tên phòng"
                value={formData.roomName || ''}
                onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                label="Mô tả"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                minRows={3}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Giá (VND)"
                value={formData.price || 0}
                onChange={(value) => setFormData({ ...formData, price: value || 0 })}
                required
                min={0}
                step={10000}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Giá giảm (VND)"
                value={formData.discountPrice || 0}
                onChange={(value) => setFormData({ ...formData, discountPrice: value || 0 })}
                min={0}
                step={10000}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Sức chứa"
                value={formData.capacity || 1}
                onChange={(value) => setFormData({ ...formData, capacity: value || 1 })}
                required
                min={1}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="Loại phòng"
                value={formData.roomType || 'Tiêu chuẩn'}
                onChange={(value) => setFormData({ ...formData, roomType: value })}
                data={['Tiêu chuẩn', 'Deluxe', 'Suite', 'Gia đình', 'VIP']}
                required
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="Loại giường"
                value={formData.bedType || 'Đơn'}
                onChange={(value) => setFormData({ ...formData, bedType: value })}
                data={['Đơn', 'Đôi', 'Queen', 'King', 'Twin']}
                required
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="View"
                value={formData.view || 'Không'}
                onChange={(value) => setFormData({ ...formData, view: value })}
                data={['Biển', 'Thành phố', 'Núi', 'Vườn', 'Hồ bơi', 'Không']}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Tầng"
                value={formData.floor || 1}
                onChange={(value) => setFormData({ ...formData, floor: value || 1 })}
                required
                min={1}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Diện tích (m²)"
                value={formData.area || 0}
                onChange={(value) => setFormData({ ...formData, area: value || 0 })}
                required
                min={0}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Đánh giá (0-5)"
                value={formData.rating || 0}
                onChange={(value) => setFormData({ ...formData, rating: value || 0 })}
                min={0}
                max={5}
                step={0.1}
                precision={1}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <MultiSelect
                label="Tiện ích"
                data={commonAmenities}
                value={formData.amenities || []}
                onChange={(value) => setFormData({ ...formData, amenities: value })}
                placeholder="Chọn các tiện ích"
                searchable
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Switch
                label="Phòng có sẵn"
                checked={formData.isAvailable !== undefined ? formData.isAvailable : true}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.currentTarget.checked })}
              />
            </Grid.Col>
          </Grid>
          <Group position="right" mt="md">
            <Button onClick={closeAdd} color="gray" variant="outline">Hủy</Button>
            <Button onClick={handleSaveRoom} color="blue" loading={saving}>
              Tạo phòng
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Modal chỉnh sửa phòng */}
      <Modal
        opened={editOpened}
        onClose={closeEdit}
        title="Chỉnh sửa thông tin phòng"
        centered
        size="xl"
      >
        <Stack spacing="md">
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Số phòng"
                value={formData.roomNumber || ''}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Tên phòng"
                value={formData.roomName || ''}
                onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                label="Mô tả"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                minRows={3}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Giá (VND)"
                value={formData.price || 0}
                onChange={(value) => setFormData({ ...formData, price: value || 0 })}
                required
                min={0}
                step={10000}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value))
                    ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : ''
                }
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Giá giảm (VND)"
                value={formData.discountPrice || 0}
                onChange={(value) => setFormData({ ...formData, discountPrice: value || 0 })}
                min={0}
                step={10000}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Sức chứa"
                value={formData.capacity || 1}
                onChange={(value) => setFormData({ ...formData, capacity: value || 1 })}
                required
                min={1}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="Loại phòng"
                value={formData.roomType || 'Tiêu chuẩn'}
                onChange={(value) => setFormData({ ...formData, roomType: value })}
                data={['Tiêu chuẩn', 'Deluxe', 'Suite', 'Gia đình', 'VIP']}
                required
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="Loại giường"
                value={formData.bedType || 'Đơn'}
                onChange={(value) => setFormData({ ...formData, bedType: value })}
                data={['Đơn', 'Đôi', 'Queen', 'King', 'Twin']}
                required
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                label="View"
                value={formData.view || 'Không'}
                onChange={(value) => setFormData({ ...formData, view: value })}
                data={['Biển', 'Thành phố', 'Núi', 'Vườn', 'Hồ bơi', 'Không']}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Tầng"
                value={formData.floor || 1}
                onChange={(value) => setFormData({ ...formData, floor: value || 1 })}
                required
                min={1}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Diện tích (m²)"
                value={formData.area || 0}
                onChange={(value) => setFormData({ ...formData, area: value || 0 })}
                required
                min={0}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput
                label="Đánh giá (0-5)"
                value={formData.rating || 0}
                onChange={(value) => setFormData({ ...formData, rating: value || 0 })}
                min={0}
                max={5}
                step={0.1}
                precision={1}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <MultiSelect
                label="Tiện ích"
                data={commonAmenities}
                value={formData.amenities || []}
                onChange={(value) => setFormData({ ...formData, amenities: value })}
                placeholder="Chọn các tiện ích"
                searchable
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Switch
                label="Phòng có sẵn"
                checked={formData.isAvailable !== undefined ? formData.isAvailable : true}
                onChange={(e) => setFormData({ ...formData, isAvailable: e.currentTarget.checked })}
              />
            </Grid.Col>
          </Grid>
          <Group position="right" mt="md">
            <Button onClick={closeEdit} color="gray" variant="outline">Hủy</Button>
            <Button onClick={handleSaveRoom} color="blue" loading={saving}>
              Lưu thay đổi
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}

export default ManageRooms;
