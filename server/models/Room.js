import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true, // Đảm bảo số phòng không trùng lặp
    trim: true,
  },
  roomName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  amenities: {
    type: [String],
    default: [],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  images: {
    type: [String], // Mảng các URL hình ảnh
    default: [],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discountPrice: {
    type: Number,
    min: 0,
    default: 0, // 0 nghĩa là không có giảm giá
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  roomType: {
    type: String,
    required: true,
    enum: ['Standard', 'Deluxe', 'Suite', 'Family', 'VIP'],
  },
  bedType: {
    type: String,
    enum: ['Đơn', 'Đôi', 'Queen', 'King', 'Twin'],
    required: true,
  },
  view: {
    type: String,
    enum: ['Biển', 'Thành phố', 'Núi', 'Vườn', 'Hồ bơi', 'Không'],
    default: 'Không',
  },
  floor: {
    type: Number,
    required: true,
    min: 1,
  },
  area: {
    type: Number, // Diện tích phòng (m²)
    required: true,
  },
}, {
  timestamps: true,
});

const Room = mongoose.model("Room", roomSchema);
export default Room;