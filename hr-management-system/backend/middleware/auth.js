const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token không được cung cấp' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Kiểm tra user còn tồn tại và active
        const [users] = await pool.execute(
            'SELECT id, username, ho_ten, vai_tro, trang_thai FROM users WHERE id = ? AND trang_thai = true',
            [decoded.userId]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'Người dùng không tồn tại hoặc đã bị vô hiệu hóa' });
        }

        req.user = users[0];
        next();
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(403).json({ message: 'Token không hợp lệ' });
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.vai_tro)) {
            return res.status(403).json({ 
                message: 'Bạn không có quyền truy cập tài nguyên này' 
            });
        }
        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRoles
};