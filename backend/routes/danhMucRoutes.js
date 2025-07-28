const express = require('express');
const router = express.Router();
const DanhMucController = require('../controllers/danhMucController');

// Routes cho Giới tính
router.get('/gioi-tinh', DanhMucController.getAllGioiTinh);
router.post('/gioi-tinh', DanhMucController.createGioiTinh);
router.put('/gioi-tinh/:id', DanhMucController.updateGioiTinh);
router.delete('/gioi-tinh/:id', DanhMucController.deleteGioiTinh);

// Routes cho Dân tộc
router.get('/dan-toc', DanhMucController.getAllDanToc);
router.post('/dan-toc', DanhMucController.createDanToc);
router.put('/dan-toc/:id', DanhMucController.updateDanToc);
router.delete('/dan-toc/:id', DanhMucController.deleteDanToc);

// Routes cho Đơn vị
router.get('/don-vi', DanhMucController.getAllDonVi);
router.get('/don-vi/:id', DanhMucController.getDonViById);
router.post('/don-vi', DanhMucController.createDonVi);
router.put('/don-vi/:id', DanhMucController.updateDonVi);
router.delete('/don-vi/:id', DanhMucController.deleteDonVi);

// Routes cho Cấp bậc
router.get('/cap-bac', DanhMucController.getAllCapBac);
router.post('/cap-bac', DanhMucController.createCapBac);
router.put('/cap-bac/:id', DanhMucController.updateCapBac);
router.delete('/cap-bac/:id', DanhMucController.deleteCapBac);

// Routes cho Chức vụ
router.get('/chuc-vu', DanhMucController.getAllChucVu);
router.post('/chuc-vu', DanhMucController.createChucVu);
router.put('/chuc-vu/:id', DanhMucController.updateChucVu);
router.delete('/chuc-vu/:id', DanhMucController.deleteChucVu);

module.exports = router;