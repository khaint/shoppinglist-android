const { pool } = require('../config/database');
const path = require('path');
const fs = require('fs');

// QUẢN LÝ QUÁ TRÌNH CÔNG TÁC
const getQuaTrinhCongTac = async (req, res) => {
    try {
        const { can_bo_id } = req.params;
        const { page = 1, limit = 10 } = req.query;
        
        const offset = (page - 1) * limit;

        const query = `
            SELECT * FROM qua_trinh_cong_tac 
            WHERE can_bo_id = ? 
            ORDER BY tu_ngay DESC 
            LIMIT ? OFFSET ?
        `;

        const countQuery = `
            SELECT COUNT(*) as total FROM qua_trinh_cong_tac WHERE can_bo_id = ?
        `;

        const [quaTrinhList] = await pool.execute(query, [can_bo_id, parseInt(limit), parseInt(offset)]);
        const [countResult] = await pool.execute(countQuery, [can_bo_id]);

        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        res.json({
            data: quaTrinhList,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalRecords: total,
                limit: parseInt(limit)
            }
        });

    } catch (error) {
        console.error('Get qua trinh cong tac error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const createQuaTrinhCongTac = async (req, res) => {
    try {
        const { can_bo_id } = req.params;
        const { tu_ngay, den_ngay, cong_viec, don_vi_cong_tac, so_quyet_dinh, ghi_chu } = req.body;

        if (!tu_ngay || !cong_viec || !don_vi_cong_tac) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin bắt buộc' });
        }

        const fileName = req.file ? req.file.filename : null;

        const query = `
            INSERT INTO qua_trinh_cong_tac 
            (can_bo_id, tu_ngay, den_ngay, cong_viec, don_vi_cong_tac, so_quyet_dinh, file_quyet_dinh, ghi_chu)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(query, [
            can_bo_id, tu_ngay, den_ngay, cong_viec, don_vi_cong_tac, so_quyet_dinh, fileName, ghi_chu
        ]);

        res.status(201).json({
            message: 'Thêm quá trình công tác thành công',
            id: result.insertId
        });

    } catch (error) {
        console.error('Create qua trinh cong tac error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const updateQuaTrinhCongTac = async (req, res) => {
    try {
        const { id } = req.params;
        const { tu_ngay, den_ngay, cong_viec, don_vi_cong_tac, so_quyet_dinh, ghi_chu } = req.body;

        // Lấy thông tin file cũ
        const [existing] = await pool.execute('SELECT file_quyet_dinh FROM qua_trinh_cong_tac WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy quá trình công tác' });
        }

        let fileName = existing[0].file_quyet_dinh;

        // Nếu có file mới được upload
        if (req.file) {
            // Xóa file cũ nếu tồn tại
            if (fileName) {
                const oldFilePath = path.join(__dirname, '../../uploads', fileName);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }
            fileName = req.file.filename;
        }

        const query = `
            UPDATE qua_trinh_cong_tac SET 
            tu_ngay = ?, den_ngay = ?, cong_viec = ?, don_vi_cong_tac = ?, 
            so_quyet_dinh = ?, file_quyet_dinh = ?, ghi_chu = ?
            WHERE id = ?
        `;

        await pool.execute(query, [
            tu_ngay, den_ngay, cong_viec, don_vi_cong_tac, so_quyet_dinh, fileName, ghi_chu, id
        ]);

        res.json({ message: 'Cập nhật quá trình công tác thành công' });

    } catch (error) {
        console.error('Update qua trinh cong tac error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const deleteQuaTrinhCongTac = async (req, res) => {
    try {
        const { id } = req.params;

        // Lấy thông tin file để xóa
        const [existing] = await pool.execute('SELECT file_quyet_dinh FROM qua_trinh_cong_tac WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy quá trình công tác' });
        }

        // Xóa file nếu tồn tại
        const fileName = existing[0].file_quyet_dinh;
        if (fileName) {
            const filePath = path.join(__dirname, '../../uploads', fileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await pool.execute('DELETE FROM qua_trinh_cong_tac WHERE id = ?', [id]);

        res.json({ message: 'Xóa quá trình công tác thành công' });

    } catch (error) {
        console.error('Delete qua trinh cong tac error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// QUẢN LÝ QUÁ TRÌNH ĐÀO TẠO
const getQuaTrinhDaoTao = async (req, res) => {
    try {
        const { can_bo_id } = req.params;
        const { page = 1, limit = 10 } = req.query;
        
        const offset = (page - 1) * limit;

        const query = `
            SELECT * FROM qua_trinh_dao_tao 
            WHERE can_bo_id = ? 
            ORDER BY tu_ngay DESC 
            LIMIT ? OFFSET ?
        `;

        const countQuery = `
            SELECT COUNT(*) as total FROM qua_trinh_dao_tao WHERE can_bo_id = ?
        `;

        const [quaTrinhList] = await pool.execute(query, [can_bo_id, parseInt(limit), parseInt(offset)]);
        const [countResult] = await pool.execute(countQuery, [can_bo_id]);

        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        res.json({
            data: quaTrinhList,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalRecords: total,
                limit: parseInt(limit)
            }
        });

    } catch (error) {
        console.error('Get qua trinh dao tao error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const createQuaTrinhDaoTao = async (req, res) => {
    try {
        const { can_bo_id } = req.params;
        const { tu_ngay, den_ngay, chuyen_nganh, truong_dao_tao, loai_bang_cap, xep_loai, ghi_chu } = req.body;

        if (!tu_ngay || !chuyen_nganh || !truong_dao_tao || !loai_bang_cap) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin bắt buộc' });
        }

        const fileName = req.file ? req.file.filename : null;

        const query = `
            INSERT INTO qua_trinh_dao_tao 
            (can_bo_id, tu_ngay, den_ngay, chuyen_nganh, truong_dao_tao, loai_bang_cap, xep_loai, file_bang_cap, ghi_chu)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(query, [
            can_bo_id, tu_ngay, den_ngay, chuyen_nganh, truong_dao_tao, loai_bang_cap, xep_loai, fileName, ghi_chu
        ]);

        res.status(201).json({
            message: 'Thêm quá trình đào tạo thành công',
            id: result.insertId
        });

    } catch (error) {
        console.error('Create qua trinh dao tao error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// QUẢN LÝ QUÁ TRÌNH LƯƠNG
const getQuaTrinhLuong = async (req, res) => {
    try {
        const { can_bo_id } = req.params;
        const { page = 1, limit = 10 } = req.query;
        
        const offset = (page - 1) * limit;

        const query = `
            SELECT qtl.*, cb.ten_cap_bac
            FROM qua_trinh_luong qtl
            LEFT JOIN dm_cap_bac cb ON qtl.cap_bac_id = cb.id
            WHERE qtl.can_bo_id = ? 
            ORDER BY qtl.ngay_nhan_cap_bac DESC 
            LIMIT ? OFFSET ?
        `;

        const countQuery = `
            SELECT COUNT(*) as total FROM qua_trinh_luong WHERE can_bo_id = ?
        `;

        const [quaTrinhList] = await pool.execute(query, [can_bo_id, parseInt(limit), parseInt(offset)]);
        const [countResult] = await pool.execute(countQuery, [can_bo_id]);

        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        res.json({
            data: quaTrinhList,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalRecords: total,
                limit: parseInt(limit)
            }
        });

    } catch (error) {
        console.error('Get qua trinh luong error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const createQuaTrinhLuong = async (req, res) => {
    try {
        const { can_bo_id } = req.params;
        const { cap_bac_id, ngay_nhan_cap_bac, he_so_luong, ngay_nhan_he_so_luong, so_quyet_dinh, ghi_chu } = req.body;

        if (!cap_bac_id || !ngay_nhan_cap_bac || !he_so_luong || !ngay_nhan_he_so_luong) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin bắt buộc' });
        }

        const fileName = req.file ? req.file.filename : null;

        const query = `
            INSERT INTO qua_trinh_luong 
            (can_bo_id, cap_bac_id, ngay_nhan_cap_bac, he_so_luong, ngay_nhan_he_so_luong, so_quyet_dinh, file_quyet_dinh, ghi_chu)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(query, [
            can_bo_id, cap_bac_id, ngay_nhan_cap_bac, he_so_luong, ngay_nhan_he_so_luong, so_quyet_dinh, fileName, ghi_chu
        ]);

        res.status(201).json({
            message: 'Thêm quá trình lương thành công',
            id: result.insertId
        });

    } catch (error) {
        console.error('Create qua trinh luong error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

module.exports = {
    // Quá trình công tác
    getQuaTrinhCongTac,
    createQuaTrinhCongTac,
    updateQuaTrinhCongTac,
    deleteQuaTrinhCongTac,
    
    // Quá trình đào tạo
    getQuaTrinhDaoTao,
    createQuaTrinhDaoTao,
    
    // Quá trình lương
    getQuaTrinhLuong,
    createQuaTrinhLuong
};