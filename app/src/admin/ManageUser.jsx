import React, { useState, useEffect } from "react";
import { Container, Title, Table, Button, Modal, TextInput, Group, Box } from "@mantine/core";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../axios";
import { AiOutlineRollback } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function ManageUser() {
  const [users, setUsers] = useState([]);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate =useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    oldPassword: "",
    newPassword: "",
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data|| []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateUser = async () => {
    try {
      await api.put(`/users/${selectedUser._id}`, formData);
      fetchUsers();
      setOpenedEdit(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container>
      <Group position="apart" mt="md" mb="md">
        <Title order={2}>Quản lý người dùng</Title>
      </Group>
      <Button
            variant="outline"
            color="gray"
            onClick={() => navigate("/admin")}
            leftIcon={<AiOutlineRollback size={20} />}
      >
        Quay về trang Admin
      </Button>
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
              <td>{user.phoneNumber || "N/A"}</td>
              <td>{user.address || "N/A"}</td>
              <td>
                <Group spacing="xs">
                  <Button size="xs" color="blue" onClick={() => {
                    setSelectedUser(user);
                    setFormData({
                      email: user.email,
                      phone: user.phoneNumber,
                      address: user.address,
                      oldPassword: "",
                      newPassword: "",
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

      <Modal opened={openedEdit} onClose={() => setOpenedEdit(false)} title="Cập nhật người dùng" centered>
        <Box>
          <TextInput label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required mb="sm" />
          <TextInput label="Số điện thoại" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required mb="sm" />
          <TextInput label="Địa chỉ" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required mb="sm" />
          <Button fullWidth onClick={handleUpdateUser}>Cập nhật</Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default ManageUser;