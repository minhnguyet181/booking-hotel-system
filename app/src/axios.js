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
      const currentPath = window.location.pathname;
      // Chỉ redirect nếu không phải đang ở trang login hoặc register
      if (currentPath !== '/users' && currentPath !== '/register') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Chỉ redirect nếu không phải đang ở trang admin (để tránh loop)
        if (!currentPath.startsWith('/admin')) {
          window.location.href = '/users';
        }
      }
    }
    return Promise.reject(error);
  }
);
export default api;
