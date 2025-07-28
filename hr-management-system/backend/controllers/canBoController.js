const { pool } = require('../config/database');

// Lấy danh sách cán bộ với phân trang và tìm kiếm
const getCanBo = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            search = '', 
            don_vi_id = '', 
            trang_thai = '' 
        } = req.query;

        const offset = (page - 1) * limit;
        let whereConditions = [];
        let params = [];

        // Xây dựng điều kiện tìm kiếm
        if (search) {
            whereConditions.push('(cb.ho_ten LIKE ? OR cb.so_ho_so LIKE ? OR cb.can_cuoc_cong_dan LIKE ?)');
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        if (don_vi_id) {
            whereConditions.push('cb.don_vi_id = ?');
            params.push(don_vi_id);
        }

        if (trang_thai) {
            whereConditions.push('cb.trang_thai = ?');
            params.push(trang_thai);
        }

        const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

        // Query lấy danh sách cán bộ
        const query = `
            SELECT 
                cb.*,
                gt.ten_gioi_tinh,
                dt.ten_dan_toc,
                dv.ten_don_vi,
                cap.ten_cap_bac,
                cv.ten_chuc_vu,
                cv.phu_cap
            FROM can_bo cb
            LEFT JOIN dm_gioi_tinh gt ON cb.gioi_tinh_id = gt.id
            LEFT JOIN dm_dan_toc dt ON cb.dan_toc_id = dt.id
            LEFT JOIN dm_don_vi dv ON cb.don_vi_id = dv.id
            LEFT JOIN dm_cap_bac cap ON cb.cap_bac_id = cap.id
            LEFT JOIN dm_chuc_vu cv ON cb.chuc_vu_id = cv.id
            ${whereClause}
            ORDER BY cb.created_at DESC
            LIMIT ? OFFSET ?
        `;

        // Query đếm tổng số bản ghi
        const countQuery = `
            SELECT COUNT(*) as total
            FROM can_bo cb
            ${whereClause}
        `;

        const [canBoList] = await pool.execute(query, [...params, parseInt(limit), parseInt(offset)]);
        const [countResult] = await pool.execute(countQuery, params);

        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        res.json({
            data: canBoList,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalRecords: total,
                limit: parseInt(limit)
            }
        });

    } catch (error) {
        console.error('Get can bo error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Lấy thông tin chi tiết một cán bộ
const getCanBoById = async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT 
                cb.*,
                gt.ten_gioi_tinh,
                dt.ten_dan_toc,
                dv.ten_don_vi,
                cap.ten_cap_bac,
                cv.ten_chuc_vu,
                cv.phu_cap
            FROM can_bo cb
            LEFT JOIN dm_gioi_tinh gt ON cb.gioi_tinh_id = gt.id
            LEFT JOIN dm_dan_toc dt ON cb.dan_toc_id = dt.id
            LEFT JOIN dm_don_vi dv ON cb.don_vi_id = dv.id
            LEFT JOIN dm_cap_bac cap ON cb.cap_bac_id = cap.id
            LEFT JOIN dm_chuc_vu cv ON cb.chuc_vu_id = cv.id
            WHERE cb.id = ?
        `;

        const [canBo] = await pool.execute(query, [id]);

        if (canBo.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy cán bộ' });
        }

        res.json(canBo[0]);

    } catch (error) {
        console.error('Get can bo by id error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Tạo mới cán bộ
const createCanBo = async (req, res) => {
    try {
        const {
            so_ho_so, ho_ten, ngay_sinh, gioi_tinh_id, dan_toc_id,
            don_vi_id, cap_bac_id, chuc_vu_id, he_so_luong,
            can_cuoc_cong_dan, so_the_dang, dia_chi_thuong_tru,
            so_dien_thoai, email, ghi_chu
        } = req.body;

        // Kiểm tra các trường bắt buộc
        if (!so_ho_so || !ho_ten || !ngay_sinh || !gioi_tinh_id || !dan_toc_id || !don_vi_id) {
            return res.status(400).json({ 
                message: 'Vui lòng nhập đầy đủ thông tin bắt buộc' 
            });
        }

        // Kiểm tra số hồ sơ đã tồn tại
        const [existing] = await pool.execute(
            'SELECT id FROM can_bo WHERE so_ho_so = ?',
            [so_ho_so]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: 'Số hồ sơ đã tồn tại' });
        }

        // Thêm mới cán bộ
        const query = `
            INSERT INTO can_bo (
                so_ho_so, ho_ten, ngay_sinh, gioi_tinh_id, dan_toc_id,
                don_vi_id, cap_bac_id, chuc_vu_id, he_so_luong,
                can_cuoc_cong_dan, so_the_dang, dia_chi_thuong_tru,
                so_dien_thoai, email, ghi_chu
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(query, [
            so_ho_so, ho_ten, ngay_sinh, gioi_tinh_id, dan_toc_id,
            don_vi_id, cap_bac_id, chuc_vu_id, he_so_luong,
            can_cuoc_cong_dan, so_the_dang, dia_chi_thuong_tru,
            so_dien_thoai, email, ghi_chu
        ]);

        res.status(201).json({
            message: 'Thêm cán bộ thành công',
            id: result.insertId
        });

    } catch (error) {
        console.error('Create can bo error:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Số hồ sơ hoặc CCCD đã tồn tại' });
        }
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Cập nhật thông tin cán bộ
const updateCanBo = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            so_ho_so, ho_ten, ngay_sinh, gioi_tinh_id, dan_toc_id,
            don_vi_id, cap_bac_id, chuc_vu_id, he_so_luong,
            can_cuoc_cong_dan, so_the_dang, dia_chi_thuong_tru,
            so_dien_thoai, email, trang_thai, ghi_chu
        } = req.body;

        // Kiểm tra cán bộ tồn tại
        const [existing] = await pool.execute('SELECT id FROM can_bo WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy cán bộ' });
        }

        // Kiểm tra số hồ sơ trùng (ngoại trừ bản ghi hiện tại)
        const [duplicate] = await pool.execute(
            'SELECT id FROM can_bo WHERE so_ho_so = ? AND id != ?',
            [so_ho_so, id]
        );

        if (duplicate.length > 0) {
            return res.status(400).json({ message: 'Số hồ sơ đã tồn tại' });
        }

        // Cập nhật thông tin
        const query = `
            UPDATE can_bo SET
                so_ho_so = ?, ho_ten = ?, ngay_sinh = ?, gioi_tinh_id = ?, dan_toc_id = ?,
                don_vi_id = ?, cap_bac_id = ?, chuc_vu_id = ?, he_so_luong = ?,
                can_cuoc_cong_dan = ?, so_the_dang = ?, dia_chi_thuong_tru = ?,
                so_dien_thoai = ?, email = ?, trang_thai = ?, ghi_chu = ?
            WHERE id = ?
        `;

        await pool.execute(query, [
            so_ho_so, ho_ten, ngay_sinh, gioi_tinh_id, dan_toc_id,
            don_vi_id, cap_bac_id, chuc_vu_id, he_so_luong,
            can_cuoc_cong_dan, so_the_dang, dia_chi_thuong_tru,
            so_dien_thoai, email, trang_thai, ghi_chu, id
        ]);

        res.json({ message: 'Cập nhật thông tin cán bộ thành công' });

    } catch (error) {
        console.error('Update can bo error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Xóa cán bộ
const deleteCanBo = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra cán bộ tồn tại
        const [existing] = await pool.execute('SELECT id FROM can_bo WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy cán bộ' });
        }

        // Xóa cán bộ (cascade sẽ xóa các bản ghi liên quan)
        await pool.execute('DELETE FROM can_bo WHERE id = ?', [id]);

        res.json({ message: 'Xóa cán bộ thành công' });

    } catch (error) {
        console.error('Delete can bo error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

module.exports = {
    getCanBo,
    getCanBoById,
    createCanBo,
    updateCanBo,
    deleteCanBo
};