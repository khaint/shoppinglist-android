const express = require('express');
const router = express.Router();
const { 
    getCanBo, 
    getCanBoById, 
    createCanBo, 
    updateCanBo, 
    deleteCanBo 
} = require('../controllers/canBoController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Tất cả routes đều yêu cầu authentication
router.use(authenticateToken);

// Lấy danh sách cán bộ
router.get('/', getCanBo);

// Lấy thông tin chi tiết một cán bộ
router.get('/:id', getCanBoById);

// Tạo mới cán bộ (chỉ admin và user)
router.post('/', authorizeRoles('admin', 'user'), createCanBo);

// Cập nhật thông tin cán bộ (chỉ admin và user)
router.put('/:id', authorizeRoles('admin', 'user'), updateCanBo);

// Xóa cán bộ (chỉ admin)
router.delete('/:id', authorizeRoles('admin'), deleteCanBo);

module.exports = router;