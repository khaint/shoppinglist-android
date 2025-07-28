const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const canBoRoutes = require('./routes/canBoRoutes');
const danhMucRoutes = require('./routes/danhMucRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/can-bo', canBoRoutes);
app.use('/api/danh-muc', danhMucRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'API Hệ thống quản lý cán bộ',
        version: '1.0.0',
        endpoints: [
            '/api/can-bo - Quản lý cán bộ',
            '/api/danh-muc - Quản lý danh mục'
        ]
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra trên server',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Không tìm thấy endpoint này'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server đang chạy trên port ${PORT}`);
    console.log(`URL: http://localhost:${PORT}`);
});