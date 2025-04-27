import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// Tạo một schema cho User
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true, 
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
  },
  birthDate: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
}, {
  timestamps: true,
});
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Phương thức để kiểm tra mật khẩu
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};


// Tạo model User
const User = mongoose.model('User', userSchema);
export default User;