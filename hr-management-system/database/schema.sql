-- Tạo database
CREATE DATABASE IF NOT EXISTS hr_management_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hr_management_db;

-- Bảng danh mục đơn vị
CREATE TABLE dm_don_vi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ma_don_vi VARCHAR(20) UNIQUE NOT NULL,
    ten_don_vi VARCHAR(255) NOT NULL,
    don_vi_cha_id INT,
    mo_ta TEXT,
    trang_thai BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (don_vi_cha_id) REFERENCES dm_don_vi(id)
);

-- Bảng danh mục giới tính
CREATE TABLE dm_gioi_tinh (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ma_gioi_tinh VARCHAR(10) UNIQUE NOT NULL,
    ten_gioi_tinh VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng danh mục dân tộc
CREATE TABLE dm_dan_toc (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ma_dan_toc VARCHAR(10) UNIQUE NOT NULL,
    ten_dan_toc VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng danh mục cấp bậc
CREATE TABLE dm_cap_bac (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ma_cap_bac VARCHAR(20) UNIQUE NOT NULL,
    ten_cap_bac VARCHAR(100) NOT NULL,
    he_so_luong_co_ban DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng danh mục chức vụ
CREATE TABLE dm_chuc_vu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ma_chuc_vu VARCHAR(20) UNIQUE NOT NULL,
    ten_chuc_vu VARCHAR(100) NOT NULL,
    phu_cap DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng cán bộ chính
CREATE TABLE can_bo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    so_ho_so VARCHAR(20) UNIQUE NOT NULL,
    ho_ten VARCHAR(255) NOT NULL,
    ngay_sinh DATE NOT NULL,
    gioi_tinh_id INT NOT NULL,
    dan_toc_id INT NOT NULL,
    don_vi_id INT NOT NULL,
    cap_bac_id INT,
    chuc_vu_id INT,
    he_so_luong DECIMAL(5,2),
    can_cuoc_cong_dan VARCHAR(20),
    so_the_dang VARCHAR(20),
    dia_chi_thuong_tru TEXT,
    so_dien_thoai VARCHAR(15),
    email VARCHAR(100),
    trang_thai ENUM('hoat_dong', 'nghi_viec', 'chuyen_cong_tac', 'huu_tri') DEFAULT 'hoat_dong',
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (gioi_tinh_id) REFERENCES dm_gioi_tinh(id),
    FOREIGN KEY (dan_toc_id) REFERENCES dm_dan_toc(id),
    FOREIGN KEY (don_vi_id) REFERENCES dm_don_vi(id),
    FOREIGN KEY (cap_bac_id) REFERENCES dm_cap_bac(id),
    FOREIGN KEY (chuc_vu_id) REFERENCES dm_chuc_vu(id)
);

-- Bảng quá trình công tác
CREATE TABLE qua_trinh_cong_tac (
    id INT PRIMARY KEY AUTO_INCREMENT,
    can_bo_id INT NOT NULL,
    tu_ngay DATE NOT NULL,
    den_ngay DATE,
    cong_viec VARCHAR(255) NOT NULL,
    don_vi_cong_tac VARCHAR(255) NOT NULL,
    so_quyet_dinh VARCHAR(50),
    file_quyet_dinh VARCHAR(255),
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (can_bo_id) REFERENCES can_bo(id) ON DELETE CASCADE
);

-- Bảng quá trình đào tạo
CREATE TABLE qua_trinh_dao_tao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    can_bo_id INT NOT NULL,
    tu_ngay DATE NOT NULL,
    den_ngay DATE,
    chuyen_nganh VARCHAR(255) NOT NULL,
    truong_dao_tao VARCHAR(255) NOT NULL,
    loai_bang_cap ENUM('trung_cap', 'cao_dang', 'dai_hoc', 'thac_si', 'tien_si', 'khac') NOT NULL,
    xep_loai VARCHAR(50),
    file_bang_cap VARCHAR(255),
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (can_bo_id) REFERENCES can_bo(id) ON DELETE CASCADE
);

-- Bảng quá trình lương
CREATE TABLE qua_trinh_luong (
    id INT PRIMARY KEY AUTO_INCREMENT,
    can_bo_id INT NOT NULL,
    cap_bac_id INT NOT NULL,
    ngay_nhan_cap_bac DATE NOT NULL,
    he_so_luong DECIMAL(5,2) NOT NULL,
    ngay_nhan_he_so_luong DATE NOT NULL,
    so_quyet_dinh VARCHAR(50),
    file_quyet_dinh VARCHAR(255),
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (can_bo_id) REFERENCES can_bo(id) ON DELETE CASCADE,
    FOREIGN KEY (cap_bac_id) REFERENCES dm_cap_bac(id)
);

-- Bảng khen thưởng
CREATE TABLE khen_thuong (
    id INT PRIMARY KEY AUTO_INCREMENT,
    can_bo_id INT NOT NULL,
    ngay_khen_thuong DATE NOT NULL,
    hinh_thuc_khen_thuong VARCHAR(255) NOT NULL,
    ly_do TEXT NOT NULL,
    cap_khen_thuong ENUM('co_so', 'cap_tren', 'trung_uong', 'nha_nuoc') NOT NULL,
    so_quyet_dinh VARCHAR(50),
    file_quyet_dinh VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (can_bo_id) REFERENCES can_bo(id) ON DELETE CASCADE
);

-- Bảng kỷ luật
CREATE TABLE ky_luat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    can_bo_id INT NOT NULL,
    ngay_ky_luat DATE NOT NULL,
    hinh_thuc_ky_luat VARCHAR(255) NOT NULL,
    ly_do TEXT NOT NULL,
    thoi_han_ky_luat DATE,
    so_quyet_dinh VARCHAR(50),
    file_quyet_dinh VARCHAR(255),
    trang_thai ENUM('con_hieu_luc', 'het_hieu_luc') DEFAULT 'con_hieu_luc',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (can_bo_id) REFERENCES can_bo(id) ON DELETE CASCADE
);

-- Bảng quan hệ gia đình
CREATE TABLE quan_he_gia_dinh (
    id INT PRIMARY KEY AUTO_INCREMENT,
    can_bo_id INT NOT NULL,
    ho_ten VARCHAR(255) NOT NULL,
    quan_he ENUM('vo_chong', 'con', 'bo', 'me', 'anh_chi_em', 'khac') NOT NULL,
    nam_sinh YEAR,
    nghe_nghiep VARCHAR(255),
    noi_o_hien_tai TEXT,
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (can_bo_id) REFERENCES can_bo(id) ON DELETE CASCADE
);

-- Bảng phân loại thi đua từng năm
CREATE TABLE phan_loai_thi_dua (
    id INT PRIMARY KEY AUTO_INCREMENT,
    can_bo_id INT NOT NULL,
    nam YEAR NOT NULL,
    xep_loai ENUM('xuat_sac', 'tot', 'kha', 'trung_binh', 'yeu') NOT NULL,
    diem_danh_gia DECIMAL(4,2),
    nhan_xet TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (can_bo_id) REFERENCES can_bo(id) ON DELETE CASCADE,
    UNIQUE KEY unique_can_bo_nam (can_bo_id, nam)
);

-- Bảng người dùng hệ thống
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    ho_ten VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    vai_tro ENUM('admin', 'user', 'viewer') DEFAULT 'user',
    trang_thai BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert dữ liệu mẫu cho danh mục giới tính
INSERT INTO dm_gioi_tinh (ma_gioi_tinh, ten_gioi_tinh) VALUES 
('M', 'Nam'),
('F', 'Nữ');

-- Insert dữ liệu mẫu cho dân tộc (một số dân tộc chính)
INSERT INTO dm_dan_toc (ma_dan_toc, ten_dan_toc) VALUES 
('01', 'Kinh'),
('02', 'Tày'),
('03', 'Thái'),
('04', 'Hoa'),
('05', 'Khmer'),
('06', 'Mường'),
('07', 'Nùng'),
('08', 'HMông'),
('09', 'Dao'),
('10', 'Gia Rai');

-- Insert dữ liệu mẫu cho cấp bậc
INSERT INTO dm_cap_bac (ma_cap_bac, ten_cap_bac, he_so_luong_co_ban) VALUES 
('CV1', 'Công việc viên bậc 1', 2.34),
('CV2', 'Công việc viên bậc 2', 2.67),
('CV3', 'Công việc viên bậc 3', 3.00),
('CV4', 'Công việc viên bậc 4', 3.33),
('CV5', 'Công việc viên bậc 5', 3.66),
('TH1', 'Thuyền trưởng bậc 1', 4.00),
('TH2', 'Thuyền trưởng bậc 2', 4.40),
('TH3', 'Thuyền trưởng bậc 3', 4.80),
('TH4', 'Thuyền trưởng bậc 4', 5.20),
('CN1', 'Chuyên viên bậc 1', 3.00),
('CN2', 'Chuyên viên bậc 2', 3.33),
('CN3', 'Chuyên viên bậc 3', 3.66),
('CN4', 'Chuyên viên bậc 4', 4.00);

-- Insert dữ liệu mẫu cho chức vụ
INSERT INTO dm_chuc_vu (ma_chuc_vu, ten_chuc_vu, phu_cap) VALUES 
('GD', 'Giám đốc', 2000000),
('PGD', 'Phó Giám đốc', 1500000),
('TP', 'Trưởng phòng', 1000000),
('PTP', 'Phó Trưởng phòng', 700000),
('TT', 'Trưởng tổ', 500000),
('CV', 'Chuyên viên', 0),
('NV', 'Nhân viên', 0);

-- Insert tài khoản admin mặc định (password: admin123)
INSERT INTO users (username, password, ho_ten, email, vai_tro) VALUES 
('admin', '$2a$10$X7f8LzXnNy7uGhyKGP5jVOw8Lr8yt5JdF/Qn5NqNB5dKj5jgFOJ8e', 'Administrator', 'admin@hrms.com', 'admin');