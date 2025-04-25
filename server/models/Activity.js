import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Vui lòng nhập tên hoạt động'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Vui lòng nhập mô tả hoạt động']
  },
  image: {
    type: String,
    default: 'default.jpg'
  },
  price: {
    type: Number,
    default: 0
  },
  duration: {
    type: String
  },
  location: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;