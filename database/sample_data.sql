-- Dữ liệu mẫu cho hệ thống quản lý cán bộ
USE staff_management;

-- Dữ liệu mẫu cho bảng giới tính
INSERT INTO dm_gioi_tinh (ten_gioi_tinh) VALUES 
('Nam'), 
('Nữ');

-- Dữ liệu mẫu cho bảng dân tộc
INSERT INTO dm_dan_toc (ten_dan_toc) VALUES 
('Kinh'), 
('Tày'), 
('Thái'), 
('Hoa'), 
('Khmer'), 
('Mường'), 
('Nùng'), 
('HMông'), 
('Dao'), 
('Gia Rai');

-- Dữ liệu mẫu cho bảng đơn vị
INSERT INTO dm_don_vi (ma_don_vi, ten_don_vi, cap_don_vi) VALUES 
('BGD', 'Ban Giám đốc', 1),
('HC', 'Phòng Hành chính', 2),
('KT', 'Phòng Kế toán', 2),
('TCKT', 'Phòng Tài chính - Kế toán', 2),
('NS', 'Phòng Nhân sự', 2),
('CNTT', 'Phòng Công nghệ thông tin', 2),
('KD', 'Phòng Kinh doanh', 2),
('SX', 'Phòng Sản xuất', 2),
('QC', 'Phòng Kiểm soát chất lượng', 2),
('R&D', 'Phòng Nghiên cứu và Phát triển', 2);

-- Dữ liệu mẫu cho bảng cấp bậc
INSERT INTO dm_cap_bac (ten_cap_bac, thu_tu) VALUES 
('Nhân viên', 1),
('Chuyên viên', 2),
('Chuyên viên chính', 3),
('Chuyên viên cao cấp', 4),
('Phó trưởng phòng', 5),
('Trưởng phòng', 6),
('Phó giám đốc', 7),
('Giám đốc', 8),
('Chủ tịch HĐQT', 9);

-- Dữ liệu mẫu cho bảng chức vụ
INSERT INTO dm_chuc_vu (ten_chuc_vu, cap_chuc_vu) VALUES 
('Nhân viên', 1),
('Tổ trưởng', 2),
('Phó trưởng phòng', 3),
('Trưởng phòng', 4),
('Phó phòng ban', 5),
('Trưởng phòng ban', 6),
('Phó giám đốc', 7),
('Giám đốc', 8),
('Chủ tịch HĐQT', 9);

-- Dữ liệu mẫu cho bảng cán bộ
INSERT INTO can_bo (
    so_ho_so, ho_ten, ngay_sinh, gioi_tinh_id, dan_toc_id, don_vi_id, 
    cap_bac_id, chuc_vu_id, he_so_luong, can_cuoc_cong_dan, so_the_dang, 
    dia_chi, so_dien_thoai, email, ngay_vao_dang, ngay_vao_lam
) VALUES 
('HS001', 'Nguyễn Văn An', '1980-01-15', 1, 1, 1, 8, 8, 4.5, '001080001234', 'D001234', 'Hà Nội', '0901234567', 'nva@company.com', '2005-03-01', '2000-08-01'),
('HS002', 'Trần Thị Bình', '1985-05-20', 2, 1, 2, 6, 6, 3.8, '001085005678', 'D005678', 'TP.HCM', '0902345678', 'ttb@company.com', '2008-07-15', '2005-03-01'),
('HS003', 'Lê Văn Cường', '1982-03-10', 1, 1, 3, 5, 5, 3.2, '001082003456', 'D003456', 'Đà Nẵng', '0903456789', 'lvc@company.com', '2010-01-10', '2007-06-15'),
('HS004', 'Phạm Thị Dung', '1990-07-25', 2, 1, 4, 3, 3, 2.8, '001090007890', 'D007890', 'Hải Phòng', '0904567890', 'ptd@company.com', '2015-05-20', '2012-09-01'),
('HS005', 'Hoàng Văn Em', '1988-12-05', 1, 2, 5, 4, 4, 3.0, '001088012345', 'D012345', 'Cần Thơ', '0905678901', 'hve@company.com', '2013-11-12', '2010-04-01');

-- Dữ liệu mẫu cho quá trình công tác
INSERT INTO qua_trinh_cong_tac (so_ho_so, tu_ngay, den_ngay, cong_viec, don_vi_cong_tac, so_quyet_dinh) VALUES 
('HS001', '2000-08-01', '2005-12-31', 'Chuyên viên', 'Phòng Kế toán', 'QD001/2000'),
('HS001', '2006-01-01', '2010-12-31', 'Phó trưởng phòng', 'Phòng Kế toán', 'QD002/2006'),
('HS001', '2011-01-01', NULL, 'Giám đốc', 'Ban Giám đốc', 'QD003/2011'),
('HS002', '2005-03-01', '2010-06-30', 'Chuyên viên', 'Phòng Hành chính', 'QD004/2005'),
('HS002', '2010-07-01', NULL, 'Trưởng phòng', 'Phòng Hành chính', 'QD005/2010');

-- Dữ liệu mẫu cho quá trình đào tạo
INSERT INTO qua_trinh_dao_tao (so_ho_so, tu_ngay, den_ngay, chuyen_nganh, truong_dao_tao, bang_cap, loai_hinh_dao_tao) VALUES 
('HS001', '1998-09-01', '2002-06-30', 'Kế toán', 'Đại học Kinh tế Quốc dân', 'Cử nhân', 'Chính quy'),
('HS001', '2008-09-01', '2010-12-30', 'MBA', 'Đại học Kinh tế TP.HCM', 'Thạc sỹ', 'Tại chức'),
('HS002', '2001-09-01', '2005-06-30', 'Quản trị nhân lực', 'Đại học Lao động - Xã hội', 'Cử nhân', 'Chính quy'),
('HS003', '1999-09-01', '2003-06-30', 'Tài chính - Ngân hàng', 'Học viện Ngân hàng', 'Cử nhân', 'Chính quy'),
('HS004', '2008-09-01', '2012-06-30', 'Kế toán', 'Đại học Thương mại', 'Cử nhân', 'Chính quy');

-- Dữ liệu mẫu cho quá trình lương
INSERT INTO qua_trinh_luong (so_ho_so, cap_bac_id, ngay_nhan_cap_bac, he_so_luong, ngay_nhan_he_so_luong, so_quyet_dinh) VALUES 
('HS001', 2, '2002-08-01', 2.2, '2002-08-01', 'QD-L001/2002'),
('HS001', 4, '2005-08-01', 3.0, '2005-08-01', 'QD-L002/2005'),
('HS001', 8, '2011-01-01', 4.5, '2011-01-01', 'QD-L003/2011'),
('HS002', 2, '2007-03-01', 2.2, '2007-03-01', 'QD-L004/2007'),
('HS002', 6, '2010-07-01', 3.8, '2010-07-01', 'QD-L005/2010');

-- Dữ liệu mẫu cho khen thưởng
INSERT INTO khen_thuong (so_ho_so, loai_khen_thuong, cap_khen_thuong, ngay_khen_thuong, so_quyet_dinh, ly_do) VALUES 
('HS001', 'Bằng khen', 'Bộ', '2015-12-20', 'QD-KT001/2015', 'Hoàn thành xuất sắc nhiệm vụ năm 2015'),
('HS001', 'Giấy khen', 'Công ty', '2020-01-15', 'QD-KT002/2020', 'Thành tích nổi bật trong công tác quản lý'),
('HS002', 'Giấy khen', 'Công ty', '2018-03-08', 'QD-KT003/2018', 'Hoàn thành tốt nhiệm vụ được giao'),
('HS003', 'Giấy khen', 'Phòng', '2019-12-31', 'QD-KT004/2019', 'Cá nhân tiêu biểu năm 2019');

-- Dữ liệu mẫu cho quan hệ gia đình
INSERT INTO quan_he_gia_dinh (so_ho_so, ho_ten, quan_he, ngay_sinh, nghe_nghiep, noi_lam_viec, dia_chi) VALUES 
('HS001', 'Lê Thị Hoa', 'Vợ', '1983-05-10', 'Giáo viên', 'Trường THPT Chu Văn An', 'Hà Nội'),
('HS001', 'Nguyễn Văn Bình', 'Con trai', '2008-03-15', 'Học sinh', 'Trường THCS Trần Phú', 'Hà Nội'),
('HS001', 'Nguyễn Thị Lan', 'Con gái', '2012-08-20', 'Học sinh', 'Trường Tiểu học Kim Đồng', 'Hà Nội'),
('HS002', 'Nguyễn Văn Đức', 'Chồng', '1980-12-25', 'Kỹ sư', 'Công ty TNHH ABC', 'TP.HCM'),
('HS002', 'Nguyễn Thị Mai', 'Con gái', '2010-07-12', 'Học sinh', 'Trường Tiểu học Nguyễn Du', 'TP.HCM');

-- Dữ liệu mẫu cho phân loại thi đua
INSERT INTO phan_loai_thi_dua (so_ho_so, nam, xep_loai, diem_so) VALUES 
('HS001', 2020, 'Xuất sắc', 9.5),
('HS001', 2021, 'Xuất sắc', 9.2),
('HS001', 2022, 'Tốt', 8.8),
('HS002', 2020, 'Tốt', 8.5),
('HS002', 2021, 'Tốt', 8.7),
('HS002', 2022, 'Khá', 7.8),
('HS003', 2020, 'Khá', 7.5),
('HS003', 2021, 'Tốt', 8.2),
('HS003', 2022, 'Tốt', 8.0),
('HS004', 2020, 'Trung bình', 6.8),
('HS004', 2021, 'Khá', 7.2),
('HS004', 2022, 'Khá', 7.5),
('HS005', 2020, 'Khá', 7.8),
('HS005', 2021, 'Tốt', 8.1),
('HS005', 2022, 'Tốt', 8.3);