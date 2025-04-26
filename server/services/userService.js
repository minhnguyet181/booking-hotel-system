import * as userRepository from '../repositories/user.repo.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (userData) => {
  return await userRepository.registerUser (userData);
};

export const loginUser = async (email, password) => {
  const user = await userRepository.loginUser (email, password);
  const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { user, accessToken };
};

export const updateUser = async (id, updates) => {
  return await userRepository.updateUser (id, updates);
};

export const deleteUser = async (id) => {
  return await userRepository.deleteUser (id);
};

export const findById = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new Error('Người dùng không tồn tại');
  }
  return user;
};

export const findAll = async () => {
  return await userRepository.getAllUsers();
};
export const logoutUser =async() => {
  return await userRepository.logoutUser();
}