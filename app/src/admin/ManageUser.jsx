import React, { useState, useEffect } from "react";
import { 
  Container, Title, Table, Button, Modal, TextInput, Group, Box, 
  Alert, Select, Badge, Text, ActionIcon, Stack
} from "@mantine/core";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import api from "../axios";
import { AiOutlineRollback } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [notification, setNotification] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    fullName: "",
    role: "user",
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      const usersList = res.data || [];
      setUsers(usersList);
      setFilteredUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
      setNotification({ type: 'error', message: 'Không thể tải danh sách người dùng' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber?.includes(searchTerm) ||
        user.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by role
    if (roleFilter !== "all") {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, users]);

  const handleUpdateUser = async () => {
    try {
      setSaving(true);
      await api.put(`/users/${selectedUser._id}`, formData);
      setNotification({ type: 'success', message: 'Cập nhật người dùng thành công!' });
      fetchUsers();
      setOpenedEdit(false);
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Error updating user:", error);
      setNotification({ 
        type: 'error', 
        message: error.response?.data?.message || 'Lỗi khi cập nhật người dùng' 
      });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    openDelete();
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      await api.delete(`/users/${userToDelete._id}`);
      setNotification({ type: 'success', message: 'Xóa người dùng thành công!' });
      fetchUsers();
      closeDelete();
      setUserToDelete(null);
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Error deleting user:", error);
      setNotification({ 
        type: 'error', 
        message: error.response?.data?.message || 'Lỗi khi xóa người dùng' 
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <Container size="xl">
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

      <Group position="apart" mt="md" mb="md">
        <Title order={2}>Quản lý người dùng</Title>
      </Group>
      
      <Button
        variant="outline"
        color="gray"
        onClick={() => navigate("/admin")}
        leftIcon={<AiOutlineRollback size={20} />}
        mb="md"
      >
        Quay về trang Admin
      </Button>

      {/* Search and Filter */}
      <Group mb="md" spacing="md">
        <TextInput
          placeholder="Tìm kiếm theo email, tên, số điện thoại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<FaSearch size={16} />}
          style={{ flex: 1 }}
        />
        <Select
          placeholder="Lọc theo vai trò"
          value={roleFilter}
          onChange={setRoleFilter}
          data={[
            { value: 'all', label: 'Tất cả' },
            { value: 'admin', label: 'Admin' },
            { value: 'user', label: 'Người dùng' }
          ]}
          style={{ width: 200 }}
        />
        <Text size="sm" color="dimmed">
          Tổng: {filteredUsers.length} người dùng
        </Text>
      </Group>

      {filteredUsers.length === 0 ? (
        <Text align="center" size="lg" color="dimmed" mt="xl" py="xl">
          {searchTerm || roleFilter !== 'all' 
            ? 'Không tìm thấy người dùng nào phù hợp' 
            : 'Chưa có người dùng nào'}
        </Text>
      ) : (
        <Table striped highlightOnHover withBorder withColumnBorders>
          <thead>
            <tr>
              <th>Tên đầy đủ</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Vai trò</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName || "N/A"}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber || "N/A"}</td>
                <td>{user.address || "N/A"}</td>
                <td>
                  <Badge color={user.role === 'admin' ? 'red' : 'blue'} variant="light">
                    {user.role === 'admin' ? 'Admin' : 'Người dùng'}
                  </Badge>
                </td>
                <td>
                  <Group spacing="xs">
                    <ActionIcon 
                      color="blue" 
                      variant="light"
                      onClick={() => {
                        setSelectedUser(user);
                        setFormData({
                          email: user.email,
                          phone: user.phoneNumber || "",
                          address: user.address || "",
                          fullName: user.fullName || "",
                          role: user.role || "user",
                        });
                        setOpenedEdit(true);
                      }}
                    >
                      <FaEdit size={16} />
                    </ActionIcon>
                    <ActionIcon 
                      color="red" 
                      variant="light"
                      onClick={() => handleDeleteClick(user)}
                    >
                      <FaTrash size={16} />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal 
        opened={openedEdit} 
        onClose={() => setOpenedEdit(false)} 
        title="Cập nhật người dùng" 
        centered
        size="md"
      >
        <Stack spacing="md">
          <TextInput 
            label="Tên đầy đủ" 
            value={formData.fullName} 
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} 
            required 
          />
          <TextInput 
            label="Email" 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            required 
          />
          <TextInput 
            label="Số điện thoại" 
            value={formData.phone} 
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
            required 
          />
          <TextInput 
            label="Địa chỉ" 
            value={formData.address} 
            onChange={(e) => setFormData({ ...formData, address: e.target.value })} 
            required 
          />
          <Select
            label="Vai trò"
            value={formData.role}
            onChange={(value) => setFormData({ ...formData, role: value })}
            data={[
              { value: 'user', label: 'Người dùng' },
              { value: 'admin', label: 'Admin' }
            ]}
            required
          />
          <Group position="right" mt="md">
            <Button variant="outline" onClick={() => setOpenedEdit(false)}>Hủy</Button>
            <Button onClick={handleUpdateUser} loading={saving}>Cập nhật</Button>
          </Group>
        </Stack>
      </Modal>

      <Modal 
        opened={deleteOpened} 
        onClose={closeDelete} 
        title="Xác nhận xóa người dùng" 
        centered
      >
        <Text mb="md">
          Bạn có chắc chắn muốn xóa người dùng <strong>{userToDelete?.email}</strong> không? 
          Hành động này không thể hoàn tác.
        </Text>
        <Group position="right" mt="md">
          <Button variant="outline" onClick={closeDelete}>Hủy</Button>
          <Button color="red" onClick={handleDeleteUser}>Xóa</Button>
        </Group>
      </Modal>
    </Container>
  );
}

export default ManageUser;