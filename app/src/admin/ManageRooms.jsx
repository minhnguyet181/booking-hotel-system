import React, { useEffect, useState } from "react";
import { Card, Text, Button, Input, Group, Grid, Loader, Title, Image, Skeleton, Badge } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import api from "../axios";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/rooms");
      setRooms(res.data.data || []);
      console.log("Rooms:", res.data.data);

      
      // Handle different response formats
      // if (res.data && res.data.success && Array.isArray(res.data.data)) {
      //   setRooms(res.data.data);
      // } else if (Array.isArray(res.data)) {
      //   setRooms(res.data);
      // } else if (res.data && Array.isArray(res.data.rooms)) {
      //   // Another possible format
      //   setRooms(res.data.rooms);
      // } else {
      //   setError("Invalid data format received from server");
      //   setRooms([]);
      // }
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
      setError(error.response?.data?.message || error.message || "Failed to fetch rooms");
      setRooms([]);
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
      console.error("Failed to delete room:", error);
      alert(error.response?.data?.message || error.message || "Failed to delete room");
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/rooms/filter?search=${encodeURIComponent(search)}`);

      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setRooms(res.data.data);
      } else if (Array.isArray(res.data)) {
        setRooms(res.data);
      } else if (res.data && Array.isArray(res.data.rooms)) {
        setRooms(res.data.rooms);
      } else {
        setError("Invalid search results format received from server");
        setRooms([]);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setError(error.response?.data?.message || error.message || "Search failed");
      setRooms([]);
    } finally {
      setLoading(false);
      console.log(loading);
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
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
          onKeyPress={handleKeyPress}
          style={{ flex: 1, maxWidth: 400 }}
        />
        <Button onClick={handleSearch}>Search</Button>
      </Group>

      {error && (
        <Text color="red" mb="md">
          Error: {error}
        </Text>
      )}

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
            <img
            src={`/images/rooms/${room.images[0]}`}
            alt={room.roomName}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
                ) : (
                  <Skeleton height={160} mb="sm" />
                )}

                <Group position="apart" mb="xs">
                  <Text fw={500} size="lg">{room.roomName || "Unnamed Room"}</Text>
                  <Badge color={room.isAvailable ? "green" : "red"}>
                    {room.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </Group>

                <Text c="dimmed" size="sm">
                  {room.description || "No description available"}
                </Text>

                <Text size="sm" mt="xs">
                  <b>Room:</b> {room.roomNumber || "N/A"} - {room.roomType || "N/A"}
                </Text>

                <Text size="sm">
                  <b>Bed:</b> {room.bedType || "N/A"} | <b>View:</b> {room.view || "N/A"}
                </Text>

                <Text size="sm">
                  <b>Floor:</b> {room.floor || "N/A"} | <b>Area:</b> {room.area ? `${room.area} m²` : "N/A"}
                </Text>

                <Text size="sm">
                  <b>Capacity:</b> {room.capacity ? `${room.capacity} people` : "N/A"}
                </Text>

                <Text size="sm" mt="xs">
                  {room.discountPrice > 0 ? (
                    <>
                      <Text span c="dimmed" td="line-through">{room.price?.toLocaleString() || 0} VND</Text> {" "}
                      <Text span color="red">{room.discountPrice?.toLocaleString() || 0} VND</Text>
                    </>
                  ) : (
                    <>Price: {room.price?.toLocaleString() || 0} VND</>
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
