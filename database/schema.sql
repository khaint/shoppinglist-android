-- Tạo cơ sở dữ liệu quản lý cán bộ
CREATE DATABASE IF NOT EXISTS staff_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE staff_management;

-- Bảng danh mục giới tính
CREATE TABLE dm_gioi_tinh (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_gioi_tinh VARCHAR(20) NOT NULL UNIQUE,
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng danh mục dân tộc
CREATE TABLE dm_dan_toc (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_dan_toc VARCHAR(50) NOT NULL UNIQUE,
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng danh mục đơn vị
CREATE TABLE dm_don_vi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ma_don_vi VARCHAR(20) NOT NULL UNIQUE,
    ten_don_vi VARCHAR(255) NOT NULL,
    don_vi_cha_id INT,
    cap_don_vi INT DEFAULT 1,
    ghi_chu TEXT,
    trang_thai BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (don_vi_cha_id) REFERENCES dm_don_vi(id)
);

-- Bảng danh mục cấp bậc
CREATE TABLE dm_cap_bac (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_cap_bac VARCHAR(100) NOT NULL UNIQUE,
    thu_tu INT,
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng danh mục chức vụ
CREATE TABLE dm_chuc_vu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_chuc_vu VARCHAR(100) NOT NULL UNIQUE,
    cap_chuc_vu INT DEFAULT 1,
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng cán bộ chính
CREATE TABLE can_bo (
    so_ho_so VARCHAR(20) PRIMARY KEY,
    ho_ten VARCHAR(255) NOT NULL,
    ngay_sinh DATE,
    gioi_tinh_id INT,
    dan_toc_id INT,
    don_vi_id INT,
    cap_bac_id INT,
    chuc_vu_id INT,
    he_so_luong DECIMAL(4,2),
    can_cuoc_cong_dan VARCHAR(20),
    so_the_dang VARCHAR(20),
    dia_chi TEXT,
    so_dien_thoai VARCHAR(15),
    email VARCHAR(100),
    ngay_vao_dang DATE,
    ngay_vao_lam DATE,
    trang_thai ENUM('Đang làm việc', 'Nghỉ hưu', 'Chuyển công tác', 'Thôi việc') DEFAULT 'Đang làm việc',
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
    so_ho_so VARCHAR(20) NOT NULL,
    tu_ngay DATE NOT NULL,
    den_ngay DATE,
    cong_viec VARCHAR(255),
    don_vi_cong_tac VARCHAR(255),
    so_quyet_dinh VARCHAR(50),
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (so_ho_so) REFERENCES can_bo(so_ho_so) ON DELETE CASCADE
);

-- Bảng quá trình đào tạo
CREATE TABLE qua_trinh_dao_tao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    so_ho_so VARCHAR(20) NOT NULL,
    tu_ngay DATE NOT NULL,
    den_ngay DATE,
    chuyen_nganh VARCHAR(255),
    truong_dao_tao VARCHAR(255),
    bang_cap VARCHAR(100),
    loai_hinh_dao_tao VARCHAR(100),
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (so_ho_so) REFERENCES can_bo(so_ho_so) ON DELETE CASCADE
);

-- Bảng quá trình lương
CREATE TABLE qua_trinh_luong (
    id INT PRIMARY KEY AUTO_INCREMENT,
    so_ho_so VARCHAR(20) NOT NULL,
    cap_bac_id INT,
    ngay_nhan_cap_bac DATE,
    he_so_luong DECIMAL(4,2),
    ngay_nhan_he_so_luong DATE,
    so_quyet_dinh VARCHAR(50),
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (so_ho_so) REFERENCES can_bo(so_ho_so) ON DELETE CASCADE,
    FOREIGN KEY (cap_bac_id) REFERENCES dm_cap_bac(id)
);

-- Bảng khen thưởng
CREATE TABLE khen_thuong (
    id INT PRIMARY KEY AUTO_INCREMENT,
    so_ho_so VARCHAR(20) NOT NULL,
    loai_khen_thuong VARCHAR(255),
    cap_khen_thuong VARCHAR(100),
    ngay_khen_thuong DATE,
    so_quyet_dinh VARCHAR(50),
    ly_do TEXT,
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (so_ho_so) REFERENCES can_bo(so_ho_so) ON DELETE CASCADE
);

-- Bảng kỷ luật
CREATE TABLE ky_luat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    so_ho_so VARCHAR(20) NOT NULL,
    loai_ky_luat VARCHAR(255),
    ngay_ky_luat DATE,
    so_quyet_dinh VARCHAR(50),
    ly_do TEXT,
    thoi_han_xu_ly VARCHAR(100),
    trang_thai ENUM('Đang thi hành', 'Đã hết hiệu lực', 'Đã xóa') DEFAULT 'Đang thi hành',
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (so_ho_so) REFERENCES can_bo(so_ho_so) ON DELETE CASCADE
);

-- Bảng quan hệ gia đình
CREATE TABLE quan_he_gia_dinh (
    id INT PRIMARY KEY AUTO_INCREMENT,
    so_ho_so VARCHAR(20) NOT NULL,
    ho_ten VARCHAR(255) NOT NULL,
    quan_he VARCHAR(50),
    ngay_sinh DATE,
    nghe_nghiep VARCHAR(255),
    noi_lam_viec VARCHAR(255),
    dia_chi TEXT,
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (so_ho_so) REFERENCES can_bo(so_ho_so) ON DELETE CASCADE
);

-- Bảng phân loại thi đua từng năm
CREATE TABLE phan_loai_thi_dua (
    id INT PRIMARY KEY AUTO_INCREMENT,
    so_ho_so VARCHAR(20) NOT NULL,
    nam INT NOT NULL,
    xep_loai ENUM('Xuất sắc', 'Tốt', 'Khá', 'Trung bình', 'Yếu', 'Kém') DEFAULT 'Trung bình',
    diem_so DECIMAL(4,2),
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (so_ho_so) REFERENCES can_bo(so_ho_so) ON DELETE CASCADE,
    UNIQUE KEY unique_staff_year (so_ho_so, nam)
);

-- Tạo các chỉ mục để tối ưu hóa truy vấn
CREATE INDEX idx_can_bo_ho_ten ON can_bo(ho_ten);
CREATE INDEX idx_can_bo_don_vi ON can_bo(don_vi_id);
CREATE INDEX idx_can_bo_trang_thai ON can_bo(trang_thai);
CREATE INDEX idx_qua_trinh_cong_tac_so_ho_so ON qua_trinh_cong_tac(so_ho_so);
CREATE INDEX idx_qua_trinh_dao_tao_so_ho_so ON qua_trinh_dao_tao(so_ho_so);
CREATE INDEX idx_qua_trinh_luong_so_ho_so ON qua_trinh_luong(so_ho_so);
CREATE INDEX idx_khen_thuong_so_ho_so ON khen_thuong(so_ho_so);
CREATE INDEX idx_ky_luat_so_ho_so ON ky_luat(so_ho_so);
CREATE INDEX idx_quan_he_gia_dinh_so_ho_so ON quan_he_gia_dinh(so_ho_so);
CREATE INDEX idx_phan_loai_thi_dua_so_ho_so ON phan_loai_thi_dua(so_ho_so);
CREATE INDEX idx_phan_loai_thi_dua_nam ON phan_loai_thi_dua(nam);