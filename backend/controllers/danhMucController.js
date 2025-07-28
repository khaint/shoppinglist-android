const DanhMucModel = require('../models/DanhMucModel');

class DanhMucController {
    // DANH MỤC GIỚI TÍNH
    static async getAllGioiTinh(req, res) {
        try {
            const data = await DanhMucModel.getAllGioiTinh();
            res.json({
                success: true,
                message: 'Lấy danh sách giới tính thành công',
                data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    static async createGioiTinh(req, res) {
        try {
            const result = await DanhMucModel.createGioiTinh(req.body);
            res.status(201).json({
                success: true,
                message: 'Thêm giới tính thành công',
                data: { id: result.insertId }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    static async updateGioiTinh(req, res) {
        try {
            const { id } = req.params;
            await DanhMucModel.updateGioiTinh(id, req.body);
            res.json({
                success: true,
                message: 'Cập nhật giới tính thành công'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    static async deleteGioiTinh(req, res) {
        try {
            const { id } = req.params;
            await DanhMucModel.deleteGioiTinh(id);
            res.json({
                success: true,
                message: 'Xóa giới tính thành công'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    // DANH MỤC DÂN TỘC
    static async getAllDanToc(req, res) {
        try {
            const data = await DanhMucModel.getAllDanToc();
            res.json({
                success: true,
                message: 'Lấy danh sách dân tộc thành công',
                data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    static async createDanToc(req, res) {
        try {
            const result = await DanhMucModel.createDanToc(req.body);
            res.status(201).json({
                success: true,
                message: 'Thêm dân tộc thành công',
                data: { id: result.insertId }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    static async updateDanToc(req, res) {
        try {
            const { id } = req.params;
            await DanhMucModel.updateDanToc(id, req.body);
            res.json({
                success: true,
                message: 'Cập nhật dân tộc thành công'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    static async deleteDanToc(req, res) {
        try {
            const { id } = req.params;
            await DanhMucModel.deleteDanToc(id);
            res.json({
                success: true,
                message: 'Xóa dân tộc thành công'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    // DANH MỤC ĐƠN VỊ
    static async getAllDonVi(req, res) {
        try {
            const data = await DanhMucModel.getAllDonVi();
            res.json({
                success: true,
                message: 'Lấy danh sách đơn vị thành công',
                data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    static async getDonViById(req, res) {
        try {
            const { id } = req.params;
            const data = await DanhMucModel.getDonViById(id);
            if (!data) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy đơn vị'
                });
            }
            res.json({
                success: true,
                message: 'Lấy thông tin đơn vị thành công',
                data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    static async createDonVi(req, res) {
        try {
            const result = await DanhMucModel.createDonVi(req.body);
            res.status(201).json({
                success: true,
                message: 'Thêm đơn vị thành công',
                data: { id: result.insertId }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    static async updateDonVi(req, res) {
        try {
            const { id } = req.params;
            await DanhMucModel.updateDonVi(id, req.body);
            res.json({
                success: true,
                message: 'Cập nhật đơn vị thành công'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    static async deleteDonVi(req, res) {
        try {
            const { id } = req.params;
            await DanhMucModel.deleteDonVi(id);
            res.json({
                success: true,
                message: 'Xóa đơn vị thành công'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    // DANH MỤC CẤP BẬC
    static async getAllCapBac(req, res) {
        try {
            const data = await DanhMucModel.getAllCapBac();
            res.json({
                success: true,
                message: 'Lấy danh sách cấp bậc thành công',
                data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    static async createCapBac(req, res) {
        try {
            const result = await DanhMucModel.createCapBac(req.body);
            res.status(201).json({
                success: true,
                message: 'Thêm cấp bậc thành công',
                data: { id: result.insertId }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    static async updateCapBac(req, res) {
        try {
            const { id } = req.params;
            await DanhMucModel.updateCapBac(id, req.body);
            res.json({
                success: true,
                message: 'Cập nhật cấp bậc thành công'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    static async deleteCapBac(req, res) {
        try {
            const { id } = req.params;
            await DanhMucModel.deleteCapBac(id);
            res.json({
                success: true,
                message: 'Xóa cấp bậc thành công'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    // DANH MỤC CHỨC VỤ
    static async getAllChucVu(req, res) {
        try {
            const data = await DanhMucModel.getAllChucVu();
            res.json({
                success: true,
                message: 'Lấy danh sách chức vụ thành công',
                data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    static async createChucVu(req, res) {
        try {
            const result = await DanhMucModel.createChucVu(req.body);
            res.status(201).json({
                success: true,
                message: 'Thêm chức vụ thành công',
                data: { id: result.insertId }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    static async updateChucVu(req, res) {
        try {
            const { id } = req.params;
            await DanhMucModel.updateChucVu(id, req.body);
            res.json({
                success: true,
                message: 'Cập nhật chức vụ thành công'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
    
    static async deleteChucVu(req, res) {
        try {
            const { id } = req.params;
            await DanhMucModel.deleteChucVu(id);
            res.json({
                success: true,
                message: 'Xóa chức vụ thành công'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
}

module.exports = DanhMucController;