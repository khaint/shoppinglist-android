# Hệ thống Quản lý Cán bộ

Hệ thống quản lý cơ sở dữ liệu cán bộ được xây dựng bằng Node.js (Backend) và React (Frontend).

## Tính năng chính

### Quản lý Cán bộ
- ✅ Thêm, sửa, xóa, xem chi tiết cán bộ
- ✅ Tìm kiếm cán bộ theo tên, số hồ sơ, CCCD
- ✅ Phân trang danh sách cán bộ
- ✅ Thống kê cán bộ theo đơn vị và độ tuổi

### Quản lý Danh mục
- ✅ Quản lý danh mục giới tính
- ✅ Quản lý danh mục dân tộc  
- ✅ Quản lý danh mục đơn vị
- ✅ Quản lý danh mục cấp bậc
- ✅ Quản lý danh mục chức vụ

### Quản lý Quá trình (Sắp triển khai)
- 🔄 Quá trình công tác
- 🔄 Quá trình đào tạo
- 🔄 Quá trình lương
- 🔄 Khen thưởng
- 🔄 Kỷ luật
- 🔄 Quan hệ gia đình
- 🔄 Phân loại thi đua từng năm

## Cấu trúc dữ liệu

### Bảng chính
- **can_bo**: Thông tin cán bộ (số hồ sơ, họ tên, ngày sinh, giới tính, dân tộc, đơn vị, cấp bậc, chức vụ, hệ số lương, căn cước công dân, số thẻ đảng...)

### Bảng danh mục
- **dm_gioi_tinh**: Danh mục giới tính
- **dm_dan_toc**: Danh mục dân tộc
- **dm_don_vi**: Danh mục đơn vị
- **dm_cap_bac**: Danh mục cấp bậc
- **dm_chuc_vu**: Danh mục chức vụ

### Bảng quá trình
- **qua_trinh_cong_tac**: Quá trình công tác
- **qua_trinh_dao_tao**: Quá trình đào tạo
- **qua_trinh_luong**: Quá trình lương
- **khen_thuong**: Khen thưởng
- **ky_luat**: Kỷ luật
- **quan_he_gia_dinh**: Quan hệ gia đình
- **phan_loai_thi_dua**: Phân loại thi đua từng năm

## Yêu cầu hệ thống

- Node.js >= 14.x
- MySQL >= 5.7
- npm hoặc yarn

## Cài đặt

### 1. Clone repository
```bash
git clone <repository_url>
cd staff-management-system
```

### 2. Cài đặt Database

#### Tạo database MySQL:
```sql
CREATE DATABASE staff_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Import cấu trúc database:
```bash
mysql -u root -p staff_management < database/schema.sql
```

#### Import dữ liệu mẫu (tuỳ chọn):
```bash
mysql -u root -p staff_management < database/sample_data.sql
```

### 3. Cài đặt Backend

```bash
cd backend
npm install
```

#### Cấu hình database:
Chỉnh sửa file `backend/.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=staff_management
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h
```

#### Khởi động backend:
```bash
npm run dev
```

Backend sẽ chạy tại: http://localhost:5000

### 4. Cài đặt Frontend

```bash
cd frontend
npm install
```

#### Cấu hình API endpoint (tuỳ chọn):
Tạo file `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000
```

#### Khởi động frontend:
```bash
npm start
```

Frontend sẽ chạy tại: http://localhost:3000

## API Endpoints

### Cán bộ
- `GET /api/can-bo` - Lấy danh sách cán bộ
- `GET /api/can-bo/:soHoSo` - Lấy chi tiết cán bộ
- `POST /api/can-bo` - Thêm cán bộ mới
- `PUT /api/can-bo/:soHoSo` - Cập nhật cán bộ
- `DELETE /api/can-bo/:soHoSo` - Xóa cán bộ
- `GET /api/can-bo/stats/don-vi` - Thống kê theo đơn vị
- `GET /api/can-bo/stats/tuoi` - Thống kê theo độ tuổi

### Danh mục
- `GET /api/danh-muc/gioi-tinh` - Danh sách giới tính
- `GET /api/danh-muc/dan-toc` - Danh sách dân tộc
- `GET /api/danh-muc/don-vi` - Danh sách đơn vị
- `GET /api/danh-muc/cap-bac` - Danh sách cấp bậc
- `GET /api/danh-muc/chuc-vu` - Danh sách chức vụ

## Công nghệ sử dụng

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **Cors** - Cross-origin resource sharing
- **Dotenv** - Environment variables

### Frontend  
- **React** - UI Library
- **React Router** - Routing
- **React Bootstrap** - UI Components
- **Axios** - HTTP client
- **React Icons** - Icons

### Database
- **MySQL** - Relational database

## Cấu trúc thư mục

```
staff-management-system/
├── backend/                 # Node.js Backend
│   ├── config/             # Database config
│   ├── controllers/        # API controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Middleware functions
│   └── index.js           # Entry point
├── frontend/              # React Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.js         # Main app
├── database/              # Database files
│   ├── schema.sql         # Database structure
│   └── sample_data.sql    # Sample data
└── README.md
```

## Screenshots

### Dashboard
- Tổng quan thống kê hệ thống
- Biểu đồ phân bổ cán bộ theo đơn vị và độ tuổi

### Quản lý Cán bộ
- Danh sách cán bộ với tìm kiếm và phân trang
- Form thêm/sửa cán bộ
- Chi tiết hồ sơ cán bộ

### Quản lý Danh mục
- Quản lý các danh mục hệ thống

## Đóng góp

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Liên hệ

Project Link: [https://github.com/yourusername/staff-management-system](https://github.com/yourusername/staff-management-system)