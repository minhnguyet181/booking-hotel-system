import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/',
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý lỗi token hết hạn hoặc không hợp lệ
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token hết hạn hoặc không hợp lệ, đăng xuất người dùng
      window.location.href = '/'; // Chuyển hướng đến trang đăng nhập
    }
    return Promise.reject(error);
  }
);
export default api;
