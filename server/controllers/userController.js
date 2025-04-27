import * as userService from '../services/userService.js';

export const registerUser = async (req, res) => {
  try {
    const newUser  = await userService.registerUser(req.body);
    res.status(201).json({ message: 'Đăng ký thành công', user: newUser  });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken } = await userService.loginUser(email, password);
    res.status(200).json({ message: 'Đăng nhập thành công', user, accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Admin cập nhật user khác
export const updateUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Gọi service để cập nhật người dùng
    const updatedUser = await userService.updateUserByAdmin(id, updates);
    res.status(200).json({ message: 'Cập nhật người dùng thành công', user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.body.email, req.body); 
    res.status(200).json({ message: 'Cập nhật thành công', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: 'Xóa người dùng thành công' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const findById = async (req, res) => {
  try {
    const user = await userService.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const logoutUser = async (req, res) => {
  try {
    const message = await userService.logoutUser();
    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};