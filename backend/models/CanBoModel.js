const db = require('../config/database');

class CanBoModel {
    // Lấy danh sách cán bộ với phân trang và tìm kiếm
    static async getAll(page = 1, limit = 10, search = '') {
        const offset = (page - 1) * limit;
        let query = `
            SELECT 
                cb.so_ho_so,
                cb.ho_ten,
                cb.ngay_sinh,
                gt.ten_gioi_tinh,
                dt.ten_dan_toc,
                dv.ten_don_vi,
                cb.cap_bac_id,
                cbac.ten_cap_bac,
                cv.ten_chuc_vu,
                cb.he_so_luong,
                cb.can_cuoc_cong_dan,
                cb.so_the_dang,
                cb.dia_chi,
                cb.so_dien_thoai,
                cb.email,
                cb.ngay_vao_dang,
                cb.ngay_vao_lam,
                cb.trang_thai,
                cb.ghi_chu,
                cb.created_at,
                cb.updated_at
            FROM can_bo cb
            LEFT JOIN dm_gioi_tinh gt ON cb.gioi_tinh_id = gt.id
            LEFT JOIN dm_dan_toc dt ON cb.dan_toc_id = dt.id
            LEFT JOIN dm_don_vi dv ON cb.don_vi_id = dv.id
            LEFT JOIN dm_cap_bac cbac ON cb.cap_bac_id = cbac.id
            LEFT JOIN dm_chuc_vu cv ON cb.chuc_vu_id = cv.id
        `;
        
        const params = [];
        
        if (search) {
            query += ` WHERE (cb.ho_ten LIKE ? OR cb.so_ho_so LIKE ? OR cb.can_cuoc_cong_dan LIKE ?)`;
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }
        
        query += ` ORDER BY cb.updated_at DESC LIMIT ? OFFSET ?`;
        params.push(parseInt(limit), parseInt(offset));
        
        const [rows] = await db.execute(query, params);
        
        // Đếm tổng số bản ghi
        let countQuery = 'SELECT COUNT(*) as total FROM can_bo cb';
        const countParams = [];
        
        if (search) {
            countQuery += ` WHERE (cb.ho_ten LIKE ? OR cb.so_ho_so LIKE ? OR cb.can_cuoc_cong_dan LIKE ?)`;
            countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }
        
        const [countResult] = await db.execute(countQuery, countParams);
        const total = countResult[0].total;
        
        return {
            data: rows,
            pagination: {
                current_page: parseInt(page),
                per_page: parseInt(limit),
                total: total,
                total_pages: Math.ceil(total / limit)
            }
        };
    }
    
    // Lấy thông tin cán bộ theo số hồ sơ
    static async getById(soHoSo) {
        const query = `
            SELECT 
                cb.*,
                gt.ten_gioi_tinh,
                dt.ten_dan_toc,
                dv.ten_don_vi,
                cbac.ten_cap_bac,
                cv.ten_chuc_vu
            FROM can_bo cb
            LEFT JOIN dm_gioi_tinh gt ON cb.gioi_tinh_id = gt.id
            LEFT JOIN dm_dan_toc dt ON cb.dan_toc_id = dt.id
            LEFT JOIN dm_don_vi dv ON cb.don_vi_id = dv.id
            LEFT JOIN dm_cap_bac cbac ON cb.cap_bac_id = cbac.id
            LEFT JOIN dm_chuc_vu cv ON cb.chuc_vu_id = cv.id
            WHERE cb.so_ho_so = ?
        `;
        
        const [rows] = await db.execute(query, [soHoSo]);
        return rows[0];
    }
    
    // Thêm cán bộ mới
    static async create(canBoData) {
        const query = `
            INSERT INTO can_bo (
                so_ho_so, ho_ten, ngay_sinh, gioi_tinh_id, dan_toc_id, 
                don_vi_id, cap_bac_id, chuc_vu_id, he_so_luong, 
                can_cuoc_cong_dan, so_the_dang, dia_chi, so_dien_thoai, 
                email, ngay_vao_dang, ngay_vao_lam, trang_thai, ghi_chu
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const params = [
            canBoData.so_ho_so,
            canBoData.ho_ten,
            canBoData.ngay_sinh,
            canBoData.gioi_tinh_id,
            canBoData.dan_toc_id,
            canBoData.don_vi_id,
            canBoData.cap_bac_id,
            canBoData.chuc_vu_id,
            canBoData.he_so_luong,
            canBoData.can_cuoc_cong_dan,
            canBoData.so_the_dang,
            canBoData.dia_chi,
            canBoData.so_dien_thoai,
            canBoData.email,
            canBoData.ngay_vao_dang,
            canBoData.ngay_vao_lam,
            canBoData.trang_thai || 'Đang làm việc',
            canBoData.ghi_chu
        ];
        
        const [result] = await db.execute(query, params);
        return result;
    }
    
    // Cập nhật thông tin cán bộ
    static async update(soHoSo, canBoData) {
        const query = `
            UPDATE can_bo SET 
                ho_ten = ?, ngay_sinh = ?, gioi_tinh_id = ?, dan_toc_id = ?,
                don_vi_id = ?, cap_bac_id = ?, chuc_vu_id = ?, he_so_luong = ?,
                can_cuoc_cong_dan = ?, so_the_dang = ?, dia_chi = ?, 
                so_dien_thoai = ?, email = ?, ngay_vao_dang = ?, 
                ngay_vao_lam = ?, trang_thai = ?, ghi_chu = ?
            WHERE so_ho_so = ?
        `;
        
        const params = [
            canBoData.ho_ten,
            canBoData.ngay_sinh,
            canBoData.gioi_tinh_id,
            canBoData.dan_toc_id,
            canBoData.don_vi_id,
            canBoData.cap_bac_id,
            canBoData.chuc_vu_id,
            canBoData.he_so_luong,
            canBoData.can_cuoc_cong_dan,
            canBoData.so_the_dang,
            canBoData.dia_chi,
            canBoData.so_dien_thoai,
            canBoData.email,
            canBoData.ngay_vao_dang,
            canBoData.ngay_vao_lam,
            canBoData.trang_thai,
            canBoData.ghi_chu,
            soHoSo
        ];
        
        const [result] = await db.execute(query, params);
        return result;
    }
    
    // Xóa cán bộ
    static async delete(soHoSo) {
        const query = 'DELETE FROM can_bo WHERE so_ho_so = ?';
        const [result] = await db.execute(query, [soHoSo]);
        return result;
    }
    
    // Thống kê cán bộ theo đơn vị
    static async getStatsByDonVi() {
        const query = `
            SELECT 
                dv.ten_don_vi,
                COUNT(cb.so_ho_so) as so_luong_can_bo,
                COUNT(CASE WHEN cb.trang_thai = 'Đang làm việc' THEN 1 END) as dang_lam_viec,
                COUNT(CASE WHEN cb.trang_thai = 'Nghỉ hưu' THEN 1 END) as nghi_huu
            FROM dm_don_vi dv
            LEFT JOIN can_bo cb ON dv.id = cb.don_vi_id
            GROUP BY dv.id, dv.ten_don_vi
            ORDER BY so_luong_can_bo DESC
        `;
        
        const [rows] = await db.execute(query);
        return rows;
    }
    
    // Thống kê cán bộ theo độ tuổi
    static async getStatsByAge() {
        const query = `
            SELECT 
                CASE 
                    WHEN YEAR(CURDATE()) - YEAR(ngay_sinh) < 30 THEN 'Dưới 30 tuổi'
                    WHEN YEAR(CURDATE()) - YEAR(ngay_sinh) BETWEEN 30 AND 40 THEN '30-40 tuổi'
                    WHEN YEAR(CURDATE()) - YEAR(ngay_sinh) BETWEEN 41 AND 50 THEN '41-50 tuổi'
                    WHEN YEAR(CURDATE()) - YEAR(ngay_sinh) BETWEEN 51 AND 60 THEN '51-60 tuổi'
                    ELSE 'Trên 60 tuổi'
                END as nhom_tuoi,
                COUNT(*) as so_luong
            FROM can_bo
            WHERE trang_thai = 'Đang làm việc'
            GROUP BY nhom_tuoi
            ORDER BY nhom_tuoi
        `;
        
        const [rows] = await db.execute(query);
        return rows;
    }
}

module.exports = CanBoModel;