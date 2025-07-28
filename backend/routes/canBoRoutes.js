const express = require('express');
const router = express.Router();
const CanBoController = require('../controllers/canBoController');

// Danh sách cán bộ
router.get('/', CanBoController.getAll);

// Chi tiết cán bộ
router.get('/:soHoSo', CanBoController.getById);

// Thêm cán bộ mới
router.post('/', CanBoController.create);

// Cập nhật cán bộ
router.put('/:soHoSo', CanBoController.update);

// Xóa cán bộ
router.delete('/:soHoSo', CanBoController.delete);

// Thống kê
router.get('/stats/don-vi', CanBoController.getStatsByDonVi);
router.get('/stats/tuoi', CanBoController.getStatsByAge);

module.exports = router;