import * as userService from '../services/userService.js';
import jwt from 'jsonwebtoken';
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

export const registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUser= async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};