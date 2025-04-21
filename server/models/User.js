import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true, // nếu bạn muốn không trùng sđt
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // không trùng email
    match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
  },
  birthDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;
