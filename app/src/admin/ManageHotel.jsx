import React, { useState, useEffect } from "react";
import { Container, Title, TextInput, Button } from "@mantine/core";
import api from "../axios";

function ManageHotel() {
  const [hotelInfo, setHotelInfo] = useState({
    name: "",
    address: "",
    phone: "",
    description: "",
  });

  const fetchHotelInfo = async () => {
    try {
      const res = await api.get("/hotel-info");
      setHotelInfo(res.data.data || {});
    } catch (error) {
      console.error("Error fetching hotel info:", error);
    }
  };

  const handleUpdateHotelInfo = async () => {
    try {
      await api.put("/hotel-info", hotelInfo);
      fetchHotelInfo();
    } catch (error) {
      console.error("Error updating hotel info:", error);
    }
  };

  useEffect(() => {
    fetchHotelInfo();
  }, []);

  return (
    <Container>
      <Title order={2} mt="md" mb="md">Quản lý thông tin khách sạn</Title>

      <TextInput
        label="Tên khách sạn"
        value={hotelInfo.name}
        onChange={(e) => setHotelInfo({ ...hotelInfo, name: e.target.value })}
        mb="sm"
      />
      <TextInput
        label="Địa chỉ"
        value={hotelInfo.address}
        onChange={(e) => setHotelInfo({ ...hotelInfo, address: e.target.value })}
        mb="sm"
      />
      <TextInput
        label="Số điện thoại"
        value={hotelInfo.phone}
        onChange={(e) => setHotelInfo({ ...hotelInfo, phone: e.target.value })}
        mb="sm"
      />
      <TextInput
        label="Mô tả"
        value={hotelInfo.description}
        onChange={(e) => setHotelInfo({ ...hotelInfo, description: e.target.value })}
        mb="md"
      />
      <Button onClick={handleUpdateHotelInfo}>Cập nhật</Button>
    </Container>
  );
}

export default ManageHotel;
