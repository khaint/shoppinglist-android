const express = require('express');
const router = express.Router();
const { 
    getQuaTrinhCongTac, 
    createQuaTrinhCongTac, 
    updateQuaTrinhCongTac, 
    deleteQuaTrinhCongTac,
    getQuaTrinhDaoTao,
    createQuaTrinhDaoTao,
    getQuaTrinhLuong,
    createQuaTrinhLuong
} = require('../controllers/quaTrinhController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');

// Tất cả routes đều yêu cầu authentication
router.use(authenticateToken);

// ROUTES CHO QUÁ TRÌNH CÔNG TÁC
// Lấy danh sách quá trình công tác của một cán bộ
router.get('/cong-tac/:can_bo_id', getQuaTrinhCongTac);

// Thêm quá trình công tác
router.post('/cong-tac/:can_bo_id', 
    authorizeRoles('admin', 'user'),
    upload.single('file_quyet_dinh'),
    handleUploadError,
    createQuaTrinhCongTac
);

// Cập nhật quá trình công tác
router.put('/cong-tac/:id', 
    authorizeRoles('admin', 'user'),
    upload.single('file_quyet_dinh'),
    handleUploadError,
    updateQuaTrinhCongTac
);

// Xóa quá trình công tác
router.delete('/cong-tac/:id', 
    authorizeRoles('admin', 'user'),
    deleteQuaTrinhCongTac
);

// ROUTES CHO QUÁ TRÌNH ĐÀO TẠO
// Lấy danh sách quá trình đào tạo của một cán bộ
router.get('/dao-tao/:can_bo_id', getQuaTrinhDaoTao);

// Thêm quá trình đào tạo
router.post('/dao-tao/:can_bo_id', 
    authorizeRoles('admin', 'user'),
    upload.single('file_bang_cap'),
    handleUploadError,
    createQuaTrinhDaoTao
);

// ROUTES CHO QUÁ TRÌNH LƯƠNG
// Lấy danh sách quá trình lương của một cán bộ
router.get('/luong/:can_bo_id', getQuaTrinhLuong);

// Thêm quá trình lương
router.post('/luong/:can_bo_id', 
    authorizeRoles('admin', 'user'),
    upload.single('file_quyet_dinh'),
    handleUploadError,
    createQuaTrinhLuong
);

module.exports = router;