import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Table,
  Button,
  Modal,
  TextInput,
  Group,
  Box,
} from '@mantine/core';
import { FaEdit, FaTrash } from 'react-icons/fa';
import api from "../axios"; // 🔥 chỉnh path tùy dự án bạn

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Các state cho form
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    oldPassword: '',
    newPassword: '',
  });

  // Lấy danh sách user
  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Xử lý update user
  const handleUpdateUser = async () => {
    try {
      // Nếu có mật khẩu mới, gửi trường oldPassword và newPassword
      if (formData.oldPassword || formData.newPassword) {
        // Chỉ gửi oldPassword và newPassword nếu có
        const { oldPassword, newPassword } = formData;
        await api.put(`/users/${selectedUser._id}`, { ...formData, oldPassword, newPassword });
      } else {
        // Nếu không có thay đổi mật khẩu, gửi dữ liệu khác
        await api.put(`/users/${selectedUser._id}`, formData);
      }

      fetchUsers();
      setOpenedEdit(false);
      setSelectedUser(null);
      setFormData({ email: '', phone: '', address: '', oldPassword: '', newPassword: '' });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Xử lý xóa user
  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Container>
      <Group position="apart" mt="md" mb="md">
        <Title order={2}>Quản lý người dùng</Title>
      </Group>

      {/* Table người dùng */}
      <Table striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.phoneNumber || 'N/A'}</td>
              <td>{user.address || 'N/A'}</td>
              <td>
                <Group spacing="xs">
                  <Button size="xs" color="blue" onClick={() => {
                    setSelectedUser(user);
                    setFormData({
                      email: user.email,
                      phone: user.phone,
                      address: user.address,
                      oldPassword: '',
                      newPassword: '',
                    });
                    setOpenedEdit(true);
                  }}>
                    <FaEdit />
                  </Button>
                  <Button size="xs" color="red" onClick={() => handleDeleteUser(user._id)}>
                    <FaTrash />
                  </Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal cập nhật user */}
      <Modal
        opened={openedEdit}
        onClose={() => setOpenedEdit(false)}
        title="Cập nhật người dùng"
        centered
      >
        <Box>
          <TextInput
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            mb="sm"
          />
          <TextInput
            label="Số điện thoại"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            mb="sm"
          />
          <TextInput
            label="Địa chỉ"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
            mb="sm"
          />
          <TextInput
            label="Mật khẩu cũ"
            type="password"
            value={formData.oldPassword}
            onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
            mb="sm"
          />
          <TextInput
            label="Mật khẩu mới"
            type="password"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            mb="sm"
          />
          <Button fullWidth onClick={handleUpdateUser}>
            Cập nhật
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default UserManagementPage;
