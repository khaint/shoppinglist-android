const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4'
});

// Test connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Lỗi kết nối database:', err);
        return;
    }
    console.log('Kết nối database thành công');
    connection.release();
});

module.exports = pool.promise();