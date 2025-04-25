import * as userRepository from "../repositories/user.repo.js";

export const registerUser = async (userData) => {
  const existingUser = await userRepository.findUserByEmail(userData.email);
  if (existingUser) throw new Error('Email đã được đăng ký.');
  return await userRepository.createUser(userData);
};

export const loginUser = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new Error('Không tìm thấy người dùng.');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Mật khẩu không chính xác.');

  return user;
};
export const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};
export const updateUser = async (id, updateData) => {
  return await userRepository.updateUserById(id, updateData);
};

export const deleteUser = async (id) => {
  return await userRepository.deleteUserById(id);
};