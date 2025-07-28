const CanBoModel = require('../models/CanBoModel');

class CanBoController {
    // Lấy danh sách cán bộ
    static async getAll(req, res) {
        try {
            const { page = 1, limit = 10, search = '' } = req.query;
            
            const result = await CanBoModel.getAll(
                parseInt(page), 
                parseInt(limit), 
                search
            );
            
            res.json({
                success: true,
                message: 'Lấy danh sách cán bộ thành công',
                data: result.data,
                pagination: result.pagination
            });
        } catch (error) {
            console.error('Lỗi lấy danh sách cán bộ:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi server khi lấy danh sách cán bộ',
                error: error.message
            });
        }
    }
    
    // Lấy thông tin cán bộ theo số hồ sơ
    static async getById(req, res) {
        try {
            const { soHoSo } = req.params;
            
            const canBo = await CanBoModel.getById(soHoSo);
            
            if (!canBo) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy cán bộ'
                });
            }
            
            res.json({
                success: true,
                message: 'Lấy thông tin cán bộ thành công',
                data: canBo
            });
        } catch (error) {
            console.error('Lỗi lấy thông tin cán bộ:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi server khi lấy thông tin cán bộ',
                error: error.message
            });
        }
    }
    
    // Thêm cán bộ mới
    static async create(req, res) {
        try {
            const canBoData = req.body;
            
            // Kiểm tra dữ liệu bắt buộc
            if (!canBoData.so_ho_so || !canBoData.ho_ten) {
                return res.status(400).json({
                    success: false,
                    message: 'Số hồ sơ và họ tên là bắt buộc'
                });
            }
            
            // Kiểm tra số hồ sơ đã tồn tại
            const existingCanBo = await CanBoModel.getById(canBoData.so_ho_so);
            if (existingCanBo) {
                return res.status(400).json({
                    success: false,
                    message: 'Số hồ sơ đã tồn tại'
                });
            }
            
            const result = await CanBoModel.create(canBoData);
            
            res.status(201).json({
                success: true,
                message: 'Thêm cán bộ thành công',
                data: { so_ho_so: canBoData.so_ho_so, id: result.insertId }
            });
        } catch (error) {
            console.error('Lỗi thêm cán bộ:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi server khi thêm cán bộ',
                error: error.message
            });
        }
    }
    
    // Cập nhật thông tin cán bộ
    static async update(req, res) {
        try {
            const { soHoSo } = req.params;
            const canBoData = req.body;
            
            // Kiểm tra cán bộ tồn tại
            const existingCanBo = await CanBoModel.getById(soHoSo);
            if (!existingCanBo) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy cán bộ'
                });
            }
            
            const result = await CanBoModel.update(soHoSo, canBoData);
            
            if (result.affectedRows === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Không có dữ liệu nào được cập nhật'
                });
            }
            
            res.json({
                success: true,
                message: 'Cập nhật thông tin cán bộ thành công'
            });
        } catch (error) {
            console.error('Lỗi cập nhật cán bộ:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi server khi cập nhật cán bộ',
                error: error.message
            });
        }
    }
    
    // Xóa cán bộ
    static async delete(req, res) {
        try {
            const { soHoSo } = req.params;
            
            // Kiểm tra cán bộ tồn tại
            const existingCanBo = await CanBoModel.getById(soHoSo);
            if (!existingCanBo) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy cán bộ'
                });
            }
            
            const result = await CanBoModel.delete(soHoSo);
            
            if (result.affectedRows === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Không thể xóa cán bộ'
                });
            }
            
            res.json({
                success: true,
                message: 'Xóa cán bộ thành công'
            });
        } catch (error) {
            console.error('Lỗi xóa cán bộ:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi server khi xóa cán bộ',
                error: error.message
            });
        }
    }
    
    // Thống kê cán bộ theo đơn vị
    static async getStatsByDonVi(req, res) {
        try {
            const stats = await CanBoModel.getStatsByDonVi();
            
            res.json({
                success: true,
                message: 'Lấy thống kê theo đơn vị thành công',
                data: stats
            });
        } catch (error) {
            console.error('Lỗi thống kê theo đơn vị:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi server khi lấy thống kê',
                error: error.message
            });
        }
    }
    
    // Thống kê cán bộ theo độ tuổi
    static async getStatsByAge(req, res) {
        try {
            const stats = await CanBoModel.getStatsByAge();
            
            res.json({
                success: true,
                message: 'Lấy thống kê theo độ tuổi thành công',
                data: stats
            });
        } catch (error) {
            console.error('Lỗi thống kê theo độ tuổi:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi server khi lấy thống kê',
                error: error.message
            });
        }
    }
}

module.exports = CanBoController;