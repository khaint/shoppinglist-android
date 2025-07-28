const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Vui lòng nhập username và password' });
        }

        // Tìm user trong database
        const [users] = await pool.execute(
            'SELECT id, username, password, ho_ten, email, vai_tro, trang_thai FROM users WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'Username hoặc password không đúng' });
        }

        const user = users[0];

        if (!user.trang_thai) {
            return res.status(401).json({ message: 'Tài khoản đã bị vô hiệu hóa' });
        }

        // Kiểm tra password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Username hoặc password không đúng' });
        }

        // Tạo JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                username: user.username,
                vai_tro: user.vai_tro 
            },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        // Cập nhật last_login
        await pool.execute(
            'UPDATE users SET last_login = NOW() WHERE id = ?',
            [user.id]
        );

        // Trả về thông tin user (không bao gồm password)
        const { password: _, ...userInfo } = user;
        
        res.json({
            message: 'Đăng nhập thành công',
            token,
            user: userInfo
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Vui lòng nhập mật khẩu cũ và mật khẩu mới' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
        }

        // Lấy mật khẩu hiện tại
        const [users] = await pool.execute(
            'SELECT password FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        // Kiểm tra mật khẩu cũ
        const isValidOldPassword = await bcrypt.compare(oldPassword, users[0].password);
        if (!isValidOldPassword) {
            return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
        }

        // Hash mật khẩu mới
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Cập nhật mật khẩu
        await pool.execute(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedNewPassword, userId]
        );

        res.json({ message: 'Đổi mật khẩu thành công' });

    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const [users] = await pool.execute(
            'SELECT id, username, ho_ten, email, vai_tro, last_login, created_at FROM users WHERE id = ?',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        res.json(users[0]);

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

module.exports = {
    login,
    changePassword,
    getProfile
};