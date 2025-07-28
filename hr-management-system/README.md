# Hệ Thống Quản Lý Cán Bộ

Hệ thống web quản lý cơ sở dữ liệu cán bộ với đầy đủ các tính năng quản lý thông tin nhân sự, quá trình công tác, đào tạo, lương bậc, khen thưởng, kỷ luật và các thông tin liên quan.

## 🏗️ Kiến Trúc Hệ Thống

### Backend (Node.js + Express.js)
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)
- **File Upload**: Multer
- **Security**: Helmet, Rate Limiting, CORS
- **Password Hashing**: bcryptjs

### Frontend (React.js)
- **Framework**: React.js
- **UI Components**: Có thể tích hợp với Ant Design hoặc Material-UI
- **State Management**: React Hooks
- **HTTP Client**: Axios (cần cài đặt)

### Database
- **Engine**: MySQL 8.0+
- **Charset**: UTF8MB4 (hỗ trợ tiếng Việt)
- **Schema**: Được thiết kế với các bảng chuẩn hóa

## 📋 Tính Năng Chính

### 1. Quản Lý Cán Bộ
- ✅ Thêm, sửa, xóa thông tin cán bộ
- ✅ Tìm kiếm và lọc danh sách
- ✅ Phân trang dữ liệu
- ✅ Quản lý trạng thái cán bộ

### 2. Quản Lý Quá Trình Công Tác
- ✅ Ghi nhận lịch sử công tác
- ✅ Upload file quyết định
- ✅ Theo dõi thời gian làm việc

### 3. Quản Lý Quá Trình Đào Tạo
- ✅ Lưu trữ thông tin học vấn
- ✅ Upload bằng cấp, chứng chỉ
- ✅ Phân loại theo cấp độ đào tạo

### 4. Quản Lý Quá Trình Lương
- ✅ Theo dõi lịch sử nâng lương
- ✅ Quản lý cấp bậc và hệ số lương
- ✅ Upload quyết định lương

### 5. Khen Thưởng & Kỷ Luật
- ✅ Ghi nhận khen thưởng
- ✅ Quản lý kỷ luật
- ✅ Upload văn bản liên quan

### 6. Thông Tin Gia Đình
- ✅ Quản lý quan hệ gia đình
- ✅ Thông tin người thân

### 7. Phân Loại Thi Đua
- ✅ Đánh giá hàng năm
- ✅ Xếp loại thi đua
- ✅ Ghi chú nhận xét

### 8. Quản Lý Danh Mục
- ✅ Đơn vị tổ chức
- ✅ Cấp bậc, chức vụ
- ✅ Dân tộc, giới tính

## 📊 Cấu Trúc Database

### Bảng Chính
- `can_bo` - Thông tin cán bộ
- `qua_trinh_cong_tac` - Lịch sử công tác
- `qua_trinh_dao_tao` - Quá trình đào tạo
- `qua_trinh_luong` - Lịch sử lương
- `khen_thuong` - Khen thưởng
- `ky_luat` - Kỷ luật
- `quan_he_gia_dinh` - Quan hệ gia đình
- `phan_loai_thi_dua` - Phân loại thi đua

### Bảng Danh Mục
- `dm_don_vi` - Danh mục đơn vị
- `dm_gioi_tinh` - Danh mục giới tính
- `dm_dan_toc` - Danh mục dân tộc
- `dm_cap_bac` - Danh mục cấp bậc
- `dm_chuc_vu` - Danh mục chức vụ

### Bảng Hệ Thống
- `users` - Người dùng hệ thống

## 🚀 Cài Đặt và Triển Khai

### Yêu Cầu Hệ Thống
- Node.js 16+ 
- MySQL 8.0+
- NPM hoặc Yarn

### 1. Cài Đặt Database

```sql
-- Tạo database
CREATE DATABASE hr_management_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Import schema
mysql -u root -p hr_management_db < database/schema.sql
```

### 2. Cài Đặt Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Cấu hình file .env
cp .env.example .env
# Chỉnh sửa thông tin database trong file .env

# Khởi động server development
npm run dev

# Hoặc khởi động production
npm start
```

### 3. Cài Đặt Frontend

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies bổ sung
npm install axios react-router-dom antd

# Khởi động development
npm start
```

## 🔧 Cấu Hình

### Backend Environment (.env)
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hr_management_db
JWT_SECRET=your_secret_key
UPLOAD_PATH=../uploads
```

### API Endpoints

#### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/change-password` - Đổi mật khẩu
- `GET /api/auth/profile` - Lấy thông tin profile

#### Cán Bộ
- `GET /api/can-bo` - Danh sách cán bộ
- `GET /api/can-bo/:id` - Chi tiết cán bộ
- `POST /api/can-bo` - Thêm cán bộ
- `PUT /api/can-bo/:id` - Cập nhật cán bộ
- `DELETE /api/can-bo/:id` - Xóa cán bộ

#### Quá Trình
- `GET /api/qua-trinh/cong-tac/:can_bo_id` - Quá trình công tác
- `POST /api/qua-trinh/cong-tac/:can_bo_id` - Thêm quá trình công tác
- `GET /api/qua-trinh/dao-tao/:can_bo_id` - Quá trình đào tạo
- `POST /api/qua-trinh/dao-tao/:can_bo_id` - Thêm quá trình đào tạo
- `GET /api/qua-trinh/luong/:can_bo_id` - Quá trình lương
- `POST /api/qua-trinh/luong/:can_bo_id` - Thêm quá trình lương

#### Danh Mục
- `GET /api/danh-muc/don-vi` - Danh sách đơn vị
- `GET /api/danh-muc/gioi-tinh` - Danh sách giới tính
- `GET /api/danh-muc/dan-toc` - Danh sách dân tộc
- `GET /api/danh-muc/cap-bac` - Danh sách cấp bậc
- `GET /api/danh-muc/chuc-vu` - Danh sách chức vụ

## 👤 Tài Khoản Mặc Định

**Admin Account:**
- Username: `admin`
- Password: `admin123`

## 🔒 Bảo Mật

### Backend Security
- JWT Authentication
- Password hashing với bcryptjs
- Rate limiting (100 requests/15 phút)
- CORS protection
- Helmet security headers
- Input validation
- SQL injection protection

### File Upload Security
- File type validation
- File size limit (10MB)
- Unique filename generation
- Path traversal protection

## 📁 Cấu Trúc Thư Mục

```
hr-management-system/
├── backend/                 # Node.js Backend
│   ├── config/             # Database config
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── routes/            # API routes
│   ├── .env               # Environment variables
│   ├── server.js          # Main server file
│   └── package.json       # Dependencies
├── frontend/              # React Frontend
│   ├── src/               # Source code
│   ├── public/            # Static files
│   └── package.json       # Dependencies
├── database/              # Database schema
│   └── schema.sql         # Database structure
├── uploads/              # File uploads
└── README.md             # Documentation
```

## 🔄 Quy Trình Phát Triển

### 1. Development
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend  
cd frontend
npm start

# Terminal 3: Database
mysql -u root -p
```

### 2. Production Build
```bash
# Build frontend
cd frontend
npm run build

# Start backend production
cd backend
npm start
```

## 📝 API Documentation

### Request/Response Format

**Success Response:**
```json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalRecords": 100,
    "limit": 10
  }
}
```

**Error Response:**
```json
{
  "message": "Error description"
}
```

### Authentication
Tất cả API (trừ login) yêu cầu Header:
```
Authorization: Bearer <JWT_TOKEN>
```

## 🐛 Troubleshooting

### Database Connection Error
1. Kiểm tra MySQL service đang chạy
2. Xác nhận thông tin kết nối trong `.env`
3. Đảm bảo database đã được tạo
4. Kiểm tra quyền truy cập user

### File Upload Error
1. Kiểm tra thư mục `uploads` có quyền ghi
2. Xác nhận file size < 10MB
3. Kiểm tra định dạng file được phép

### CORS Error
1. Kiểm tra frontend URL trong backend CORS config
2. Đảm bảo backend đang chạy đúng port

## 🚀 Tính Năng Tương Lai

- [ ] Export báo cáo Excel/PDF
- [ ] Dashboard thống kê
- [ ] Notifications system
- [ ] Advanced search & filters
- [ ] Backup & restore
- [ ] Multi-language support
- [ ] Mobile responsive design
- [ ] API documentation with Swagger

## 📞 Hỗ Trợ

Nếu gặp vấn đề khi sử dụng hệ thống, vui lòng:
1. Kiểm tra log trong console
2. Xem lại cấu hình database
3. Đảm bảo tất cả dependencies đã được cài đặt

## 📄 License

Dự án này được phát triển cho mục đích học tập và thử nghiệm.