import React, { useEffect, useState } from "react";
import { Card, Text, Button, Input, Group, Grid, Loader, Title, Image, Skeleton, Badge } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import api from "../axios";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await api.get("/rooms");
      console.log("API response:", res.data); // Thêm log để debug
      if (res.data && res.data.success) {
        setRooms(res.data.data || []);
      } else if (res.data && Array.isArray(res.data)) {
        // Trường hợp API trả về mảng trực tiếp
        setRooms(res.data);
      } else {
        setError(res.data?.message || 'Không thể lấy dữ liệu phòng');
      }
    } catch (error) {
      console.error("Failed to fetch rooms:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await api.delete(`/rooms/${roomId}`);
      setRooms((prev) => prev.filter((room) => room._id !== roomId));
    } catch (error) {
      console.error("Failed to delete room:", error.message);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/rooms/filter?search=${search}`);
      setRooms(res.data.data || []);
      console.log(rooms);
    } catch (error) {
      console.error("Search failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Group position="apart" mb="md">
        <Title order={2}>Manage Rooms</Title>
        <Button onClick={() => navigate("/rooms/create")}>Create New Room</Button>
      </Group>

      <Group mb="lg">
        <Input
          placeholder="Search rooms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, maxWidth: 400 }}
        />
        <Button onClick={handleSearch}>Search</Button>
      </Group>
      {loading ? (
        <Grid>
          {[...Array(6)].map((_, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
              <Skeleton height={300} />
            </Grid.Col>
          ))}
        </Grid>
      ) : rooms && rooms.length > 0 ? (
        <Grid>
          {rooms.map((room) => (
            <Grid.Col key={room._id} span={{ base: 12, sm: 6, md: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>

                {room.images && room.images.length > 0 ? (
                  <Image
                    src={`/uploads/${room.images[0]}`}
                    alt={room.roomName}
                    height={160}
                    withPlaceholder
                    mb="sm"
                  />
                ) : (
                  <Skeleton height={160} mb="sm" />
                )}

                <Group position="apart" mb="xs">
                  <Text fw={500} size="lg">{room.roomName}</Text>
                  <Badge color={room.isAvailable ? "green" : "red"}>
                    {room.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </Group>

                <Text c="dimmed" size="sm">
                  {room.description}
                </Text>

                <Text size="sm" mt="xs">
                  <b>Room:</b> {room.roomNumber} - {room.roomType}
                </Text>

                <Text size="sm">
                  <b>Bed:</b> {room.bedType} | <b>View:</b> {room.view}
                </Text>

                <Text size="sm">
                  <b>Floor:</b> {room.floor} | <b>Area:</b> {room.area} m²
                </Text>

                <Text size="sm">
                  <b>Capacity:</b> {room.capacity} people
                </Text>

                <Text size="sm" mt="xs">
                  {room.discountPrice > 0 ? (
                    <>
                      <Text span c="dimmed" td="line-through">{room.price.toLocaleString()} VND</Text> {" "}
                      <Text span color="red">{room.discountPrice.toLocaleString()} VND</Text>
                    </>
                  ) : (
                    <>Price: {room.price.toLocaleString()} VND</>
                  )}
                </Text>

                <Group position="right" mt="md">
                  <Button size="xs" variant="default" onClick={() => navigate(`/rooms/edit/${room._id}`)}>
                    Edit
                  </Button>
                  <Button size="xs" color="red" onClick={() => handleDelete(room._id)}>
                    Delete
                  </Button>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Text align="center" color="dimmed" mt="xl">
          No rooms found.
        </Text>
      )}
    </div>
  );
};

export default ManageRooms;
