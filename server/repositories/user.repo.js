import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const registerUser  = async (userData) => {
  const existingUser  = await User.findOne({ email: userData.email });
  if (existingUser ) {
    throw new Error('Email đã tồn tại');
  }
  const newUser  = new User(userData);
  return await newUser .save();
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const updateUser  = async (id, updates) => {
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  if (!user) {
    throw new Error('Người dùng không tồn tại');
  }
  return user;
};

export const deleteUser  = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error('Người dùng không tồn tại');
  }
};

export const getAllUsers = async () => {
  return await User.find();
};

export const loginUser  = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Email không tồn tại');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Mật khẩu không đúng');
  }
  return user;
};
export const logoutUser = async () => {
  return { message: 'Người dùng đã đăng xuất thành công' };
};