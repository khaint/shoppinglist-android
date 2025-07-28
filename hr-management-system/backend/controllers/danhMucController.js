const { pool } = require('../config/database');

// QUẢN LÝ DANH MỤC ĐỚN VỊ
const getDonVi = async (req, res) => {
    try {
        const query = `
            SELECT dv.*, dvcha.ten_don_vi as ten_don_vi_cha
            FROM dm_don_vi dv
            LEFT JOIN dm_don_vi dvcha ON dv.don_vi_cha_id = dvcha.id
            WHERE dv.trang_thai = true
            ORDER BY dv.ten_don_vi
        `;

        const [donViList] = await pool.execute(query);
        res.json(donViList);

    } catch (error) {
        console.error('Get don vi error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const createDonVi = async (req, res) => {
    try {
        const { ma_don_vi, ten_don_vi, don_vi_cha_id, mo_ta } = req.body;

        if (!ma_don_vi || !ten_don_vi) {
            return res.status(400).json({ message: 'Vui lòng nhập mã và tên đơn vị' });
        }

        // Kiểm tra mã đơn vị đã tồn tại
        const [existing] = await pool.execute('SELECT id FROM dm_don_vi WHERE ma_don_vi = ?', [ma_don_vi]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Mã đơn vị đã tồn tại' });
        }

        const query = `
            INSERT INTO dm_don_vi (ma_don_vi, ten_don_vi, don_vi_cha_id, mo_ta)
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await pool.execute(query, [ma_don_vi, ten_don_vi, don_vi_cha_id, mo_ta]);

        res.status(201).json({
            message: 'Thêm đơn vị thành công',
            id: result.insertId
        });

    } catch (error) {
        console.error('Create don vi error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const updateDonVi = async (req, res) => {
    try {
        const { id } = req.params;
        const { ma_don_vi, ten_don_vi, don_vi_cha_id, mo_ta, trang_thai } = req.body;

        // Kiểm tra đơn vị tồn tại
        const [existing] = await pool.execute('SELECT id FROM dm_don_vi WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn vị' });
        }

        // Kiểm tra mã đơn vị trùng (ngoại trừ bản ghi hiện tại)
        const [duplicate] = await pool.execute(
            'SELECT id FROM dm_don_vi WHERE ma_don_vi = ? AND id != ?',
            [ma_don_vi, id]
        );

        if (duplicate.length > 0) {
            return res.status(400).json({ message: 'Mã đơn vị đã tồn tại' });
        }

        const query = `
            UPDATE dm_don_vi SET 
            ma_don_vi = ?, ten_don_vi = ?, don_vi_cha_id = ?, mo_ta = ?, trang_thai = ?
            WHERE id = ?
        `;

        await pool.execute(query, [ma_don_vi, ten_don_vi, don_vi_cha_id, mo_ta, trang_thai, id]);

        res.json({ message: 'Cập nhật đơn vị thành công' });

    } catch (error) {
        console.error('Update don vi error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// QUẢN LÝ DANH MỤC GIỚI TÍNH
const getGioiTinh = async (req, res) => {
    try {
        const [gioiTinhList] = await pool.execute('SELECT * FROM dm_gioi_tinh ORDER BY id');
        res.json(gioiTinhList);
    } catch (error) {
        console.error('Get gioi tinh error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// QUẢN LÝ DANH MỤC DÂN TỘC
const getDanToc = async (req, res) => {
    try {
        const [danTocList] = await pool.execute('SELECT * FROM dm_dan_toc ORDER BY ten_dan_toc');
        res.json(danTocList);
    } catch (error) {
        console.error('Get dan toc error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const createDanToc = async (req, res) => {
    try {
        const { ma_dan_toc, ten_dan_toc } = req.body;

        if (!ma_dan_toc || !ten_dan_toc) {
            return res.status(400).json({ message: 'Vui lòng nhập mã và tên dân tộc' });
        }

        // Kiểm tra mã dân tộc đã tồn tại
        const [existing] = await pool.execute('SELECT id FROM dm_dan_toc WHERE ma_dan_toc = ?', [ma_dan_toc]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Mã dân tộc đã tồn tại' });
        }

        const query = 'INSERT INTO dm_dan_toc (ma_dan_toc, ten_dan_toc) VALUES (?, ?)';
        const [result] = await pool.execute(query, [ma_dan_toc, ten_dan_toc]);

        res.status(201).json({
            message: 'Thêm dân tộc thành công',
            id: result.insertId
        });

    } catch (error) {
        console.error('Create dan toc error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// QUẢN LÝ DANH MỤC CẤP BẬC
const getCapBac = async (req, res) => {
    try {
        const [capBacList] = await pool.execute('SELECT * FROM dm_cap_bac ORDER BY he_so_luong_co_ban');
        res.json(capBacList);
    } catch (error) {
        console.error('Get cap bac error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const createCapBac = async (req, res) => {
    try {
        const { ma_cap_bac, ten_cap_bac, he_so_luong_co_ban } = req.body;

        if (!ma_cap_bac || !ten_cap_bac || !he_so_luong_co_ban) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
        }

        // Kiểm tra mã cấp bậc đã tồn tại
        const [existing] = await pool.execute('SELECT id FROM dm_cap_bac WHERE ma_cap_bac = ?', [ma_cap_bac]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Mã cấp bậc đã tồn tại' });
        }

        const query = 'INSERT INTO dm_cap_bac (ma_cap_bac, ten_cap_bac, he_so_luong_co_ban) VALUES (?, ?, ?)';
        const [result] = await pool.execute(query, [ma_cap_bac, ten_cap_bac, he_so_luong_co_ban]);

        res.status(201).json({
            message: 'Thêm cấp bậc thành công',
            id: result.insertId
        });

    } catch (error) {
        console.error('Create cap bac error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// QUẢN LÝ DANH MỤC CHỨC VỤ
const getChucVu = async (req, res) => {
    try {
        const [chucVuList] = await pool.execute('SELECT * FROM dm_chuc_vu ORDER BY phu_cap DESC');
        res.json(chucVuList);
    } catch (error) {
        console.error('Get chuc vu error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const createChucVu = async (req, res) => {
    try {
        const { ma_chuc_vu, ten_chuc_vu, phu_cap } = req.body;

        if (!ma_chuc_vu || !ten_chuc_vu) {
            return res.status(400).json({ message: 'Vui lòng nhập mã và tên chức vụ' });
        }

        // Kiểm tra mã chức vụ đã tồn tại
        const [existing] = await pool.execute('SELECT id FROM dm_chuc_vu WHERE ma_chuc_vu = ?', [ma_chuc_vu]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Mã chức vụ đã tồn tại' });
        }

        const query = 'INSERT INTO dm_chuc_vu (ma_chuc_vu, ten_chuc_vu, phu_cap) VALUES (?, ?, ?)';
        const [result] = await pool.execute(query, [ma_chuc_vu, ten_chuc_vu, phu_cap || 0]);

        res.status(201).json({
            message: 'Thêm chức vụ thành công',
            id: result.insertId
        });

    } catch (error) {
        console.error('Create chuc vu error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// KHEN THƯỞNG & KỶ LUẬT
const getKhenThuong = async (req, res) => {
    try {
        const { can_bo_id } = req.params;
        const { page = 1, limit = 10 } = req.query;
        
        const offset = (page - 1) * limit;

        const query = `
            SELECT * FROM khen_thuong 
            WHERE can_bo_id = ? 
            ORDER BY ngay_khen_thuong DESC 
            LIMIT ? OFFSET ?
        `;

        const countQuery = `SELECT COUNT(*) as total FROM khen_thuong WHERE can_bo_id = ?`;

        const [khenThuongList] = await pool.execute(query, [can_bo_id, parseInt(limit), parseInt(offset)]);
        const [countResult] = await pool.execute(countQuery, [can_bo_id]);

        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        res.json({
            data: khenThuongList,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalRecords: total,
                limit: parseInt(limit)
            }
        });

    } catch (error) {
        console.error('Get khen thuong error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const createKhenThuong = async (req, res) => {
    try {
        const { can_bo_id } = req.params;
        const { ngay_khen_thuong, hinh_thuc_khen_thuong, ly_do, cap_khen_thuong, so_quyet_dinh } = req.body;

        if (!ngay_khen_thuong || !hinh_thuc_khen_thuong || !ly_do || !cap_khen_thuong) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin bắt buộc' });
        }

        const fileName = req.file ? req.file.filename : null;

        const query = `
            INSERT INTO khen_thuong 
            (can_bo_id, ngay_khen_thuong, hinh_thuc_khen_thuong, ly_do, cap_khen_thuong, so_quyet_dinh, file_quyet_dinh)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(query, [
            can_bo_id, ngay_khen_thuong, hinh_thuc_khen_thuong, ly_do, cap_khen_thuong, so_quyet_dinh, fileName
        ]);

        res.status(201).json({
            message: 'Thêm khen thưởng thành công',
            id: result.insertId
        });

    } catch (error) {
        console.error('Create khen thuong error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// QUAN HỆ GIA ĐÌNH
const getQuanHeGiaDinh = async (req, res) => {
    try {
        const { can_bo_id } = req.params;

        const query = `
            SELECT * FROM quan_he_gia_dinh 
            WHERE can_bo_id = ? 
            ORDER BY created_at DESC
        `;

        const [quanHeList] = await pool.execute(query, [can_bo_id]);
        res.json(quanHeList);

    } catch (error) {
        console.error('Get quan he gia dinh error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const createQuanHeGiaDinh = async (req, res) => {
    try {
        const { can_bo_id } = req.params;
        const { ho_ten, quan_he, nam_sinh, nghe_nghiep, noi_o_hien_tai, ghi_chu } = req.body;

        if (!ho_ten || !quan_he) {
            return res.status(400).json({ message: 'Vui lòng nhập họ tên và quan hệ' });
        }

        const query = `
            INSERT INTO quan_he_gia_dinh 
            (can_bo_id, ho_ten, quan_he, nam_sinh, nghe_nghiep, noi_o_hien_tai, ghi_chu)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(query, [
            can_bo_id, ho_ten, quan_he, nam_sinh, nghe_nghiep, noi_o_hien_tai, ghi_chu
        ]);

        res.status(201).json({
            message: 'Thêm quan hệ gia đình thành công',
            id: result.insertId
        });

    } catch (error) {
        console.error('Create quan he gia dinh error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// PHÂN LOẠI THI ĐUA
const getPhanLoaiThiDua = async (req, res) => {
    try {
        const { can_bo_id } = req.params;

        const query = `
            SELECT * FROM phan_loai_thi_dua 
            WHERE can_bo_id = ? 
            ORDER BY nam DESC
        `;

        const [phanLoaiList] = await pool.execute(query, [can_bo_id]);
        res.json(phanLoaiList);

    } catch (error) {
        console.error('Get phan loai thi dua error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const createPhanLoaiThiDua = async (req, res) => {
    try {
        const { can_bo_id } = req.params;
        const { nam, xep_loai, diem_danh_gia, nhan_xet } = req.body;

        if (!nam || !xep_loai) {
            return res.status(400).json({ message: 'Vui lòng nhập năm và xếp loại' });
        }

        // Kiểm tra đã có phân loại cho năm này chưa
        const [existing] = await pool.execute(
            'SELECT id FROM phan_loai_thi_dua WHERE can_bo_id = ? AND nam = ?',
            [can_bo_id, nam]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: 'Đã có phân loại thi đua cho năm này' });
        }

        const query = `
            INSERT INTO phan_loai_thi_dua 
            (can_bo_id, nam, xep_loai, diem_danh_gia, nhan_xet)
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(query, [
            can_bo_id, nam, xep_loai, diem_danh_gia, nhan_xet
        ]);

        res.status(201).json({
            message: 'Thêm phân loại thi đua thành công',
            id: result.insertId
        });

    } catch (error) {
        console.error('Create phan loai thi dua error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

module.exports = {
    // Đơn vị
    getDonVi,
    createDonVi,
    updateDonVi,
    
    // Giới tính
    getGioiTinh,
    
    // Dân tộc
    getDanToc,
    createDanToc,
    
    // Cấp bậc
    getCapBac,
    createCapBac,
    
    // Chức vụ
    getChucVu,
    createChucVu,
    
    // Khen thưởng
    getKhenThuong,
    createKhenThuong,
    
    // Quan hệ gia đình
    getQuanHeGiaDinh,
    createQuanHeGiaDinh,
    
    // Phân loại thi đua
    getPhanLoaiThiDua,
    createPhanLoaiThiDua
};