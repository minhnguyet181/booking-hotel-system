import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Vui lòng nhập tên điểm đến'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Vui lòng nhập mô tả điểm đến']
  },
  image: {
    type: String,
    default: 'default.jpg'
  },
  distance: {
    type: String,
    required: [true, 'Vui lòng nhập khoảng cách']
  },
  category: {
    type: String,
    required: [true, 'Vui lòng nhập danh mục']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;