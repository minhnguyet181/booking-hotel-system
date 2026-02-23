import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Không có token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token không hợp lệ' });
  }
};

export const checkRoleMiddleware = (role) => (req, res, next) => {
  // Kiểm tra xem user đã được verify chưa
  if (!req.user) {
    return res.status(401).json({ message: 'Chưa xác thực' });
  }
  
  // Kiểm tra role
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Không có quyền truy cập' });
  }
  
  next();
};

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Token không hợp lệ' });
    }
  } else {
    res.status(401).json({ message: 'Không có token' });
  }
};