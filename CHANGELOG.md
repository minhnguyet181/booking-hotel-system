# Changelog - Cải tiến hệ thống Booking Hotel

## Các thay đổi đã thực hiện

### 1. ✅ Real-time Notifications với Socket.io

**Server-side:**
- Thêm Socket.io vào server (`server/socket/socketServer.js`)
- Xác thực token khi kết nối Socket.io
- Gửi notification real-time đến user khi có thông báo mới
- Tích hợp với notification service

**Client-side:**
- Thêm socket.io-client vào frontend
- Tạo utility `app/src/utils/socket.js` để quản lý kết nối Socket.io
- Tích hợp vào Navbar để nhận thông báo real-time
- Tích hợp vào NotificationsPage để cập nhật danh sách thông báo real-time
- Tự động disconnect khi logout

**Cách hoạt động:**
- Khi user đăng nhập, Socket.io tự động kết nối với token
- Khi có notification mới, server gửi qua Socket.io đến user
- Client tự động cập nhật số lượng thông báo chưa đọc
- Fallback: vẫn có polling mỗi 60 giây nếu Socket.io fail

### 2. ✅ Cải thiện Notifications trong Booking Cycle

**Các trạng thái booking:**
- `pending`: "📋 Đặt phòng của bạn đã được ghi nhận. Trạng thái: Đang chờ xác nhận..."
- `confirmed`: "✅ Đặt phòng của bạn đã được xác nhận thành công! Vui lòng chuẩn bị thông tin check-in."
- `canceled`: "❌ Đặt phòng của bạn đã bị từ chối. Vui lòng liên hệ với chúng tôi nếu có thắc mắc."
- `checked-in`: "🏨 Bạn đã check-in thành công! Chúc bạn có một kỳ nghỉ tuyệt vời!"
- `checked-out`: "👋 Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi! Hẹn gặp lại!"

**Cập nhật:**
- Thêm các trạng thái `checked-in` và `checked-out` vào Booking model
- Cải thiện nội dung thông báo với emoji và thông tin rõ ràng hơn
- Tất cả notifications đều được gửi real-time qua Socket.io

### 3. ✅ Kiểm tra và cải thiện Authentication/Authorization

**Token handling:**
- Token được lưu trong localStorage
- Token tự động được thêm vào header của mọi request
- Token hết hạn: tự động logout và redirect về trang login
- Socket.io disconnect khi token invalid

**Login/Logout:**
- Login: lưu token và user data vào localStorage
- Logout: gọi API logout, xóa token và user data, disconnect Socket.io
- Protected routes: kiểm tra token và role trước khi cho phép truy cập

**Authorization:**
- `verifyTokenMiddleware`: xác thực token cho mọi protected route
- `checkRoleMiddleware`: kiểm tra role (admin/user) cho các route cần phân quyền
- Tất cả routes admin đều được bảo vệ bằng middleware

**Cải thiện:**
- Axios interceptor xử lý lỗi 401/403 tự động
- Disconnect Socket.io khi logout hoặc token invalid
- ProtectedRoute component kiểm tra authentication và authorization

### 4. ✅ Quản lý Phòng (Room Management)

**Admin có thể:**
- Xem danh sách tất cả phòng
- Thêm phòng mới qua UI (`/admin/rooms`)
- Chỉnh sửa thông tin phòng
- Xóa phòng
- Tất cả đều yêu cầu quyền admin

**API endpoints:**
- `GET /rooms` - Lấy danh sách phòng (public)
- `GET /rooms/:id` - Lấy thông tin phòng (public)
- `POST /rooms` - Tạo phòng mới (admin only)
- `PUT /rooms/:id` - Cập nhật phòng (admin only)
- `DELETE /rooms/:id` - Xóa phòng (admin only)

### 5. ✅ File JSON mẫu để thêm phòng thủ công

**File:** `server/sample-rooms.json`
- Chứa 6 phòng mẫu với đầy đủ thông tin
- Các loại phòng: Tiêu chuẩn, Deluxe, Suite, Gia đình, VIP
- Các view: Biển, Thành phố, Núi, Vườn, Hồ bơi

**File:** `server/README-ROOMS.md`
- Hướng dẫn chi tiết cách thêm phòng
- Cấu trúc dữ liệu phòng
- Ví dụ sử dụng Postman/curl
- Lưu ý quan trọng

## Cài đặt dependencies mới

**Server:**
```bash
cd server
npm install socket.io
```

**Client:**
```bash
cd app
npm install socket.io-client
```

## Cách sử dụng

### Real-time Notifications
- Tự động hoạt động khi user đăng nhập
- Không cần cấu hình thêm
- Thông báo sẽ xuất hiện real-time khi có sự kiện mới

### Thêm phòng thủ công
1. Sử dụng file `sample-rooms.json`
2. Copy một object từ file
3. POST đến `/rooms` với token admin
4. Hoặc sử dụng trang Admin UI

### Kiểm tra Authentication
- Token tự động được validate
- Nếu token hết hạn, user sẽ tự động logout
- Socket.io sẽ tự động disconnect khi token invalid

## Lưu ý

- Socket.io cần server đang chạy để hoạt động
- Token có thời hạn 6 giờ
- Tất cả routes admin đều yêu cầu token hợp lệ và role = 'admin'
- Real-time notifications chỉ hoạt động khi user đang online
