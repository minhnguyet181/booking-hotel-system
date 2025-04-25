import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'My Hotel'
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  }],
}, {
  timestamps: true
});

const Hotels = mongoose.model('Hotel', hotelSchema);
export default Hotels;