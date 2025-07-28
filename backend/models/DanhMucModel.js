const db = require('../config/database');

class DanhMucModel {
    // DANH MỤC GIỚI TÍNH
    static async getAllGioiTinh() {
        const query = 'SELECT * FROM dm_gioi_tinh ORDER BY id';
        const [rows] = await db.execute(query);
        return rows;
    }
    
    static async createGioiTinh(data) {
        const query = 'INSERT INTO dm_gioi_tinh (ten_gioi_tinh, ghi_chu) VALUES (?, ?)';
        const [result] = await db.execute(query, [data.ten_gioi_tinh, data.ghi_chu]);
        return result;
    }
    
    static async updateGioiTinh(id, data) {
        const query = 'UPDATE dm_gioi_tinh SET ten_gioi_tinh = ?, ghi_chu = ? WHERE id = ?';
        const [result] = await db.execute(query, [data.ten_gioi_tinh, data.ghi_chu, id]);
        return result;
    }
    
    static async deleteGioiTinh(id) {
        const query = 'DELETE FROM dm_gioi_tinh WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }
    
    // DANH MỤC DÂN TỘC
    static async getAllDanToc() {
        const query = 'SELECT * FROM dm_dan_toc ORDER BY ten_dan_toc';
        const [rows] = await db.execute(query);
        return rows;
    }
    
    static async createDanToc(data) {
        const query = 'INSERT INTO dm_dan_toc (ten_dan_toc, ghi_chu) VALUES (?, ?)';
        const [result] = await db.execute(query, [data.ten_dan_toc, data.ghi_chu]);
        return result;
    }
    
    static async updateDanToc(id, data) {
        const query = 'UPDATE dm_dan_toc SET ten_dan_toc = ?, ghi_chu = ? WHERE id = ?';
        const [result] = await db.execute(query, [data.ten_dan_toc, data.ghi_chu, id]);
        return result;
    }
    
    static async deleteDanToc(id) {
        const query = 'DELETE FROM dm_dan_toc WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }
    
    // DANH MỤC ĐỢN VỊ
    static async getAllDonVi() {
        const query = `
            SELECT 
                dv.*,
                dvcha.ten_don_vi as ten_don_vi_cha
            FROM dm_don_vi dv
            LEFT JOIN dm_don_vi dvcha ON dv.don_vi_cha_id = dvcha.id
            WHERE dv.trang_thai = 1
            ORDER BY dv.cap_don_vi, dv.ten_don_vi
        `;
        const [rows] = await db.execute(query);
        return rows;
    }
    
    static async getDonViById(id) {
        const query = 'SELECT * FROM dm_don_vi WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    }
    
    static async createDonVi(data) {
        const query = `
            INSERT INTO dm_don_vi (ma_don_vi, ten_don_vi, don_vi_cha_id, cap_don_vi, ghi_chu, trang_thai) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const params = [
            data.ma_don_vi,
            data.ten_don_vi,
            data.don_vi_cha_id || null,
            data.cap_don_vi || 1,
            data.ghi_chu,
            data.trang_thai || true
        ];
        const [result] = await db.execute(query, params);
        return result;
    }
    
    static async updateDonVi(id, data) {
        const query = `
            UPDATE dm_don_vi SET 
                ma_don_vi = ?, ten_don_vi = ?, don_vi_cha_id = ?, 
                cap_don_vi = ?, ghi_chu = ?, trang_thai = ?
            WHERE id = ?
        `;
        const params = [
            data.ma_don_vi,
            data.ten_don_vi,
            data.don_vi_cha_id || null,
            data.cap_don_vi,
            data.ghi_chu,
            data.trang_thai,
            id
        ];
        const [result] = await db.execute(query, params);
        return result;
    }
    
    static async deleteDonVi(id) {
        const query = 'UPDATE dm_don_vi SET trang_thai = 0 WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }
    
    // DANH MỤC CẤP BẬC
    static async getAllCapBac() {
        const query = 'SELECT * FROM dm_cap_bac ORDER BY thu_tu, ten_cap_bac';
        const [rows] = await db.execute(query);
        return rows;
    }
    
    static async createCapBac(data) {
        const query = 'INSERT INTO dm_cap_bac (ten_cap_bac, thu_tu, ghi_chu) VALUES (?, ?, ?)';
        const [result] = await db.execute(query, [data.ten_cap_bac, data.thu_tu, data.ghi_chu]);
        return result;
    }
    
    static async updateCapBac(id, data) {
        const query = 'UPDATE dm_cap_bac SET ten_cap_bac = ?, thu_tu = ?, ghi_chu = ? WHERE id = ?';
        const [result] = await db.execute(query, [data.ten_cap_bac, data.thu_tu, data.ghi_chu, id]);
        return result;
    }
    
    static async deleteCapBac(id) {
        const query = 'DELETE FROM dm_cap_bac WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }
    
    // DANH MỤC CHỨC VỤ
    static async getAllChucVu() {
        const query = 'SELECT * FROM dm_chuc_vu ORDER BY cap_chuc_vu, ten_chuc_vu';
        const [rows] = await db.execute(query);
        return rows;
    }
    
    static async createChucVu(data) {
        const query = 'INSERT INTO dm_chuc_vu (ten_chuc_vu, cap_chuc_vu, ghi_chu) VALUES (?, ?, ?)';
        const [result] = await db.execute(query, [data.ten_chuc_vu, data.cap_chuc_vu, data.ghi_chu]);
        return result;
    }
    
    static async updateChucVu(id, data) {
        const query = 'UPDATE dm_chuc_vu SET ten_chuc_vu = ?, cap_chuc_vu = ?, ghi_chu = ? WHERE id = ?';
        const [result] = await db.execute(query, [data.ten_chuc_vu, data.cap_chuc_vu, data.ghi_chu, id]);
        return result;
    }
    
    static async deleteChucVu(id) {
        const query = 'DELETE FROM dm_chuc_vu WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    }
}

module.exports = DanhMucModel;