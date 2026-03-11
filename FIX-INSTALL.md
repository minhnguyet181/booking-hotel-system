# Hướng dẫn sửa lỗi cài đặt

## Vấn đề gặp phải

1. **Lỗi Node.js version**: `react-router-dom@7.5.2` yêu cầu Node.js >= 20.0.0, nhưng hệ thống đang dùng Node.js 18.19.1
2. **Cảnh báo package manager**: Có cả `package-lock.json` (npm) và `yarn.lock` (yarn) trong cùng project

## Giải pháp đã áp dụng

### 1. Downgrade react-router-dom
- Đã thay đổi từ `react-router-dom@^7.5.0` → `react-router-dom@^6.26.0`
- Version 6.x tương thích với Node.js 18.x

### 2. Xóa package-lock.json
- Đã xóa `app/package-lock.json` vì project đang sử dụng yarn
- Chỉ giữ lại `yarn.lock` để tránh conflict

## Cách cài đặt lại

```bash
# Vào thư mục app
cd app

# Xóa node_modules và yarn.lock cũ (nếu cần)
rm -rf node_modules
rm yarn.lock

# Cài đặt lại dependencies
yarn install

# Hoặc nếu muốn dùng npm thay vì yarn:
# npm install
# (sau đó xóa yarn.lock)
```

## Lưu ý

- **Nên sử dụng một package manager duy nhất** (yarn hoặc npm) để tránh conflict
- Nếu muốn upgrade Node.js lên version 20+, có thể:
  ```bash
  # Sử dụng nvm (nếu có)
  nvm install 20
  nvm use 20
  
  # Sau đó có thể upgrade lại react-router-dom về version 7.x
  ```

## Kiểm tra sau khi cài đặt

```bash
# Kiểm tra version Node.js
node --version

# Kiểm tra dependencies đã cài đặt
cd app
yarn list react-router-dom
```
