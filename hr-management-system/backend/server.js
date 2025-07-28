require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');

const { testConnection } = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const canBoRoutes = require('./routes/canbo');
const quaTrinhRoutes = require('./routes/quatrinh');
const danhMucRoutes = require('./routes/danhmuc');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware bảo mật
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:8080'], // Frontend URLs
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 100, // Giới hạn 100 request mỗi 15 phút
    message: 'Quá nhiều request từ IP này, vui lòng thử lại sau 15 phút'
});
app.use(limiter);

// Logging
app.use(morgan('combined'));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files cho uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'HR Management System is running',
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/can-bo', canBoRoutes);
app.use('/api/qua-trinh', quaTrinhRoutes);
app.use('/api/danh-muc', danhMucRoutes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'API endpoint không tồn tại' });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    
    // Lỗi validation
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Dữ liệu không hợp lệ',
            details: error.message
        });
    }
    
    // Lỗi JWT
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Token không hợp lệ' });
    }
    
    // Lỗi database
    if (error.code && error.code.startsWith('ER_')) {
        return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu' });
    }
    
    // Lỗi chung
    res.status(500).json({ 
        message: 'Lỗi server nội bộ',
        ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
});

// Khởi động server
const startServer = async () => {
    try {
        // Test kết nối database
        const dbConnected = await testConnection();
        if (!dbConnected) {
            console.error('❌ Không thể kết nối database, dừng server');
            process.exit(1);
        }
        
        // Khởi động server
        app.listen(PORT, () => {
            console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
            console.log(`📁 Uploads: http://localhost:${PORT}/uploads`);
            console.log(`🔐 Default admin account: admin / admin123`);
        });
        
    } catch (error) {
        console.error('❌ Lỗi khởi động server:', error);
        process.exit(1);
    }
};

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});

startServer();