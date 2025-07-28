const express = require('express');
const router = express.Router();
const {
    // Danh mục
    getDonVi, createDonVi, updateDonVi,
    getGioiTinh,
    getDanToc, createDanToc,
    getCapBac, createCapBac,
    getChucVu, createChucVu,
    
    // Khen thưởng
    getKhenThuong, createKhenThuong,
    
    // Quan hệ gia đình
    getQuanHeGiaDinh, createQuanHeGiaDinh,
    
    // Phân loại thi đua
    getPhanLoaiThiDua, createPhanLoaiThiDua
} = require('../controllers/danhMucController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');

// Tất cả routes đều yêu cầu authentication
router.use(authenticateToken);

// ROUTES CHO DANH MỤC ĐƠN VỊ
router.get('/don-vi', getDonVi);
router.post('/don-vi', authorizeRoles('admin'), createDonVi);
router.put('/don-vi/:id', authorizeRoles('admin'), updateDonVi);

// ROUTES CHO DANH MỤC GIỚI TÍNH
router.get('/gioi-tinh', getGioiTinh);

// ROUTES CHO DANH MỤC DÂN TỘC
router.get('/dan-toc', getDanToc);
router.post('/dan-toc', authorizeRoles('admin'), createDanToc);

// ROUTES CHO DANH MỤC CẤP BẬC
router.get('/cap-bac', getCapBac);
router.post('/cap-bac', authorizeRoles('admin'), createCapBac);

// ROUTES CHO DANH MỤC CHỨC VỤ
router.get('/chuc-vu', getChucVu);
router.post('/chuc-vu', authorizeRoles('admin'), createChucVu);

// ROUTES CHO KHEN THƯỞNG
router.get('/khen-thuong/:can_bo_id', getKhenThuong);
router.post('/khen-thuong/:can_bo_id', 
    authorizeRoles('admin', 'user'),
    upload.single('file_quyet_dinh'),
    handleUploadError,
    createKhenThuong
);

// ROUTES CHO QUAN HỆ GIA ĐÌNH
router.get('/quan-he-gia-dinh/:can_bo_id', getQuanHeGiaDinh);
router.post('/quan-he-gia-dinh/:can_bo_id', 
    authorizeRoles('admin', 'user'),
    createQuanHeGiaDinh
);

// ROUTES CHO PHÂN LOẠI THI ĐUA
router.get('/phan-loai-thi-dua/:can_bo_id', getPhanLoaiThiDua);
router.post('/phan-loai-thi-dua/:can_bo_id', 
    authorizeRoles('admin', 'user'),
    createPhanLoaiThiDua
);

module.exports = router;