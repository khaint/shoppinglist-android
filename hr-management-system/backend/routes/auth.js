const express = require('express');
const router = express.Router();
const { login, changePassword, getProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// Đăng nhập
router.post('/login', login);

// Đổi mật khẩu (yêu cầu đăng nhập)
router.post('/change-password', authenticateToken, changePassword);

// Lấy thông tin profile
router.get('/profile', authenticateToken, getProfile);

module.exports = router;