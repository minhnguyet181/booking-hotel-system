# Hướng dẫn thêm phòng thủ công

## Cách 1: Sử dụng file JSON mẫu

File `sample-rooms.json` chứa dữ liệu mẫu của các phòng. Bạn có thể:

1. **Sử dụng Postman/Insomnia/Thunder Client:**
   - Method: POST
   - URL: `http://localhost:5000/rooms`
   - Headers:
     ```
     Authorization: Bearer <YOUR_ADMIN_TOKEN>
     Content-Type: application/json
     ```
   - Body: Copy một object từ file `sample-rooms.json` và paste vào body

2. **Sử dụng curl:**
   ```bash
   curl -X POST http://localhost:5000/rooms \
     -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "roomNumber": "101",
       "roomName": "Phòng Tiêu Chuẩn View Biển",
       "description": "Phòng tiêu chuẩn với view biển tuyệt đẹp",
       "price": 1500000,
       "discountPrice": 1200000,
       "capacity": 2,
       "roomType": "Tiêu chuẩn",
       "bedType": "Đôi",
       "view": "Biển",
       "floor": 1,
       "area": 25,
       "isAvailable": true,
       "amenities": ["WiFi miễn phí", "Điều hòa", "TV"],
       "rating": 4.5,
       "images": ["room101-1.jpg"]
     }'
   ```

## Cách 2: Sử dụng trang Admin

1. Đăng nhập với tài khoản admin
2. Vào trang Admin (`/admin`)
3. Click vào "Quản lý phòng" (`/admin/rooms`)
4. Click nút "+ Thêm phòng mới"
5. Điền thông tin và lưu

## Cấu trúc dữ liệu phòng

```json
{
  "roomNumber": "string (required, unique)",
  "roomName": "string (required)",
  "description": "string (required)",
  "price": "number (required, min: 0)",
  "discountPrice": "number (min: 0, default: 0)",
  "capacity": "number (required, min: 1)",
  "roomType": "enum: ['Tiêu chuẩn', 'Deluxe', 'Suite', 'Gia đình', 'VIP'] (required)",
  "bedType": "enum: ['Đơn', 'Đôi', 'Queen', 'King', 'Twin'] (required)",
  "view": "enum: ['Biển', 'Thành phố', 'Núi', 'Vườn', 'Hồ bơi', 'Không'] (default: 'Không')",
  "floor": "number (required, min: 1)",
  "area": "number (required, min: 0)",
  "isAvailable": "boolean (default: true)",
  "amenities": "array of strings",
  "rating": "number (min: 0, max: 5, default: 0)",
  "images": "array of strings (image filenames)"
}
```

## Lưu ý

- `roomNumber` phải là duy nhất trong hệ thống
- Giá tiền tính bằng VND
- `discountPrice` = 0 nghĩa là không có giảm giá
- `amenities` là mảng các chuỗi, có thể chọn từ danh sách có sẵn hoặc tự nhập
