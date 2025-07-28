const db = require('../config/database');

class QuaTrinhModel {
    // QUÁ TRÌNH CÔNG TÁC
    static async getQuaTrinhCongTac(soHoSo) {
        const query = `
            SELECT * FROM qua_trinh_cong_tac 
            WHERE so_ho_so = ? 
            ORDER BY tu_ngay DESC
        `;
        const [rows] = await db.execute(query, [soHoSo]);
        return rows;
    }
    
    static async createQuaTrinhCongTac(data) {
        const query = `
            INSERT INTO qua_trinh_cong_tac 
            (so_ho_so, tu_ngay, den_ngay, cong_viec, don_vi_cong_tac, so_quyet_dinh, ghi_chu)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            data.so_ho_so, data.tu_ngay, data.den_ngay, 
            data.cong_viec, data.don_vi_cong_tac, data.so_quyet_dinh, data.ghi_chu
        ];
        const [result] = await db.execute(query, params);
        return result;
    }
    
    static async updateQuaTrinhCongTac(id, data) {
        const query = `
            UPDATE qua_trinh_cong_tac SET 
                tu_ngay = ?, den_ngay = ?, cong_viec = ?, 
                don_vi_cong_tac = ?, so_quyet_dinh = ?, ghi_chu = ?
            WHERE id = ?
        `;
        const params = [
            data.tu_ngay, data.den_ngay, data.cong_viec,
            data.don_vi_cong_tac, data.so_quyet_dinh, data.ghi_chu, id
        ];
        const [result] = await db.execute(query, params);
        return result;
    }
    
    static async deleteQuaTrinhCongTac(id) {
        const query = 'DELETE FROM qua_trinh_cong_tac WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }
    
    // QUÁ TRÌNH ĐÀO TẠO
    static async getQuaTrinhDaoTao(soHoSo) {
        const query = `
            SELECT * FROM qua_trinh_dao_tao 
            WHERE so_ho_so = ? 
            ORDER BY tu_ngay DESC
        `;
        const [rows] = await db.execute(query, [soHoSo]);
        return rows;
    }
    
    static async createQuaTrinhDaoTao(data) {
        const query = `
            INSERT INTO qua_trinh_dao_tao 
            (so_ho_so, tu_ngay, den_ngay, chuyen_nganh, truong_dao_tao, bang_cap, loai_hinh_dao_tao, ghi_chu)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            data.so_ho_so, data.tu_ngay, data.den_ngay, data.chuyen_nganh,
            data.truong_dao_tao, data.bang_cap, data.loai_hinh_dao_tao, data.ghi_chu
        ];
        const [result] = await db.execute(query, params);
        return result;
    }
    
    static async updateQuaTrinhDaoTao(id, data) {
        const query = `
            UPDATE qua_trinh_dao_tao SET 
                tu_ngay = ?, den_ngay = ?, chuyen_nganh = ?, truong_dao_tao = ?,
                bang_cap = ?, loai_hinh_dao_tao = ?, ghi_chu = ?
            WHERE id = ?
        `;
        const params = [
            data.tu_ngay, data.den_ngay, data.chuyen_nganh, data.truong_dao_tao,
            data.bang_cap, data.loai_hinh_dao_tao, data.ghi_chu, id
        ];
        const [result] = await db.execute(query, params);
        return result;
    }
    
    static async deleteQuaTrinhDaoTao(id) {
        const query = 'DELETE FROM qua_trinh_dao_tao WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }
    
    // QUÁ TRÌNH LƯƠNG
    static async getQuaTrinhLuong(soHoSo) {
        const query = `
            SELECT 
                qtl.*,
                cb.ten_cap_bac
            FROM qua_trinh_luong qtl
            LEFT JOIN dm_cap_bac cb ON qtl.cap_bac_id = cb.id
            WHERE qtl.so_ho_so = ? 
            ORDER BY qtl.ngay_nhan_he_so_luong DESC
        `;
        const [rows] = await db.execute(query, [soHoSo]);
        return rows;
    }
    
    static async createQuaTrinhLuong(data) {
        const query = `
            INSERT INTO qua_trinh_luong 
            (so_ho_so, cap_bac_id, ngay_nhan_cap_bac, he_so_luong, ngay_nhan_he_so_luong, so_quyet_dinh, ghi_chu)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            data.so_ho_so, data.cap_bac_id, data.ngay_nhan_cap_bac,
            data.he_so_luong, data.ngay_nhan_he_so_luong, data.so_quyet_dinh, data.ghi_chu
        ];
        const [result] = await db.execute(query, params);
        return result;
    }
    
    static async updateQuaTrinhLuong(id, data) {
        const query = `
            UPDATE qua_trinh_luong SET 
                cap_bac_id = ?, ngay_nhan_cap_bac = ?, he_so_luong = ?,
                ngay_nhan_he_so_luong = ?, so_quyet_dinh = ?, ghi_chu = ?
            WHERE id = ?
        `;
        const params = [
            data.cap_bac_id, data.ngay_nhan_cap_bac, data.he_so_luong,
            data.ngay_nhan_he_so_luong, data.so_quyet_dinh, data.ghi_chu, id
        ];
        const [result] = await db.execute(query, params);
        return result;
    }
    
    static async deleteQuaTrinhLuong(id) {
        const query = 'DELETE FROM qua_trinh_luong WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }
    
    // KHEN THƯỞNG
    static async getKhenThuong(soHoSo) {
        const query = `
            SELECT * FROM khen_thuong 
            WHERE so_ho_so = ? 
            ORDER BY ngay_khen_thuong DESC
        `;
        const [rows] = await db.execute(query, [soHoSo]);
        return rows;
    }
    
    static async createKhenThuong(data) {
        const query = `
            INSERT INTO khen_thuong 
            (so_ho_so, loai_khen_thuong, cap_khen_thuong, ngay_khen_thuong, so_quyet_dinh, ly_do, ghi_chu)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            data.so_ho_so, data.loai_khen_thuong, data.cap_khen_thuong,
            data.ngay_khen_thuong, data.so_quyet_dinh, data.ly_do, data.ghi_chu
        ];
        const [result] = await db.execute(query, params);
        return result;
    }
    
    static async updateKhenThuong(id, data) {
        const query = `
            UPDATE khen_thuong SET 
                loai_khen_thuong = ?, cap_khen_thuong = ?, ngay_khen_thuong = ?,
                so_quyet_dinh = ?, ly_do = ?, ghi_chu = ?
            WHERE id = ?
        `;
        const params = [
            data.loai_khen_thuong, data.cap_khen_thuong, data.ngay_khen_thuong,
            data.so_quyet_dinh, data.ly_do, data.ghi_chu, id
        ];
        const [result] = await db.execute(query, params);
        return result;
    }
    
    static async deleteKhenThuong(id) {
        const query = 'DELETE FROM khen_thuong WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }
    
    // KỶ LUẬT
    static async getKyLuat(soHoSo) {
        const query = `
            SELECT * FROM ky_luat 
            WHERE so_ho_so = ? 
            ORDER BY ngay_ky_luat DESC
        `;
        const [rows] = await db.execute(query, [soHoSo]);
        return rows;
    }
    
    static async createKyLuat(data) {
        const query = `
            INSERT INTO ky_luat 
            (so_ho_so, loai_ky_luat, ngay_ky_luat, so_quyet_dinh, ly_do, thoi_han_xu_ly, trang_thai, ghi_chu)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            data.so_ho_so, data.loai_ky_luat, data.ngay_ky_luat, data.so_quyet_dinh,
            data.ly_do, data.thoi_han_xu_ly, data.trang_thai || 'Đang thi hành', data.ghi_chu
        ];
        const [result] = await db.execute(query, params);
        return result;
    }
    
    static async updateKyLuat(id, data) {
        const query = `
            UPDATE ky_luat SET 
                loai_ky_luat = ?, ngay_ky_luat = ?, so_quyet_dinh = ?, ly_do = ?,
                thoi_han_xu_ly = ?, trang_thai = ?, ghi_chu = ?
            WHERE id = ?
        `;
        const params = [
            data.loai_ky_luat, data.ngay_ky_luat, data.so_quyet_dinh, data.ly_do,
            data.thoi_han_xu_ly, data.trang_thai, data.ghi_chu, id
        ];
        const [result] = await db.execute(query, params);
        return result;
    }
    
    static async deleteKyLuat(id) {
        const query = 'DELETE FROM ky_luat WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }
    
    // QUAN HỆ GIA ĐÌNH
    static async getQuanHeGiaDinh(soHoSo) {
        const query = `
            SELECT * FROM quan_he_gia_dinh 
            WHERE so_ho_so = ? 
            ORDER BY quan_he, ho_ten
        `;
        const [rows] = await db.execute(query, [soHoSo]);
        return rows;
    }
    
    static async createQuanHeGiaDinh(data) {
        const query = `
            INSERT INTO quan_he_gia_dinh 
            (so_ho_so, ho_ten, quan_he, ngay_sinh, nghe_nghiep, noi_lam_viec, dia_chi, ghi_chu)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            data.so_ho_so, data.ho_ten, data.quan_he, data.ngay_sinh,
            data.nghe_nghiep, data.noi_lam_viec, data.dia_chi, data.ghi_chu
        ];
        const [result] = await db.execute(query, params);
        return result;
    }
    
    static async updateQuanHeGiaDinh(id, data) {
        const query = `
            UPDATE quan_he_gia_dinh SET 
                ho_ten = ?, quan_he = ?, ngay_sinh = ?, nghe_nghiep = ?,
                noi_lam_viec = ?, dia_chi = ?, ghi_chu = ?
            WHERE id = ?
        `;
        const params = [
            data.ho_ten, data.quan_he, data.ngay_sinh, data.nghe_nghiep,
            data.noi_lam_viec, data.dia_chi, data.ghi_chu, id
        ];
        const [result] = await db.execute(query, params);
        return result;
    }
    
    static async deleteQuanHeGiaDinh(id) {
        const query = 'DELETE FROM quan_he_gia_dinh WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }
    
    // PHÂN LOẠI THI ĐUA
    static async getPhanLoaiThiDua(soHoSo) {
        const query = `
            SELECT * FROM phan_loai_thi_dua 
            WHERE so_ho_so = ? 
            ORDER BY nam DESC
        `;
        const [rows] = await db.execute(query, [soHoSo]);
        return rows;
    }
    
    static async createPhanLoaiThiDua(data) {
        const query = `
            INSERT INTO phan_loai_thi_dua 
            (so_ho_so, nam, xep_loai, diem_so, ghi_chu)
            VALUES (?, ?, ?, ?, ?)
        `;
        const params = [
            data.so_ho_so, data.nam, data.xep_loai, data.diem_so, data.ghi_chu
        ];
        const [result] = await db.execute(query, params);
        return result;
    }
    
    static async updatePhanLoaiThiDua(id, data) {
        const query = `
            UPDATE phan_loai_thi_dua SET 
                nam = ?, xep_loai = ?, diem_so = ?, ghi_chu = ?
            WHERE id = ?
        `;
        const params = [
            data.nam, data.xep_loai, data.diem_so, data.ghi_chu, id
        ];
        const [result] = await db.execute(query, params);
        return result;
    }
    
    static async deletePhanLoaiThiDua(id) {
        const query = 'DELETE FROM phan_loai_thi_dua WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }
    
    // Lấy tất cả thông tin quá trình của một cán bộ
    static async getAllQuaTrinh(soHoSo) {
        const [congTac] = await Promise.all([
            this.getQuaTrinhCongTac(soHoSo),
            this.getQuaTrinhDaoTao(soHoSo),
            this.getQuaTrinhLuong(soHoSo),
            this.getKhenThuong(soHoSo),
            this.getKyLuat(soHoSo),
            this.getQuanHeGiaDinh(soHoSo),
            this.getPhanLoaiThiDua(soHoSo)
        ]);
        
        return {
            cong_tac: congTac[0] || [],
            dao_tao: congTac[1] || [],
            luong: congTac[2] || [],
            khen_thuong: congTac[3] || [],
            ky_luat: congTac[4] || [],
            quan_he_gia_dinh: congTac[5] || [],
            phan_loai_thi_dua: congTac[6] || []
        };
    }
}

module.exports = QuaTrinhModel;