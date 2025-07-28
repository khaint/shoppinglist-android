const mysql = require('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hr_management_db',
    charset: 'utf8mb4',
    timezone: '+07:00',
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
};

// Tạo connection pool
const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test kết nối database
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Kết nối database thành công');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Lỗi kết nối database:', error.message);
        return false;
    }
};

module.exports = {
    pool,
    testConnection
};