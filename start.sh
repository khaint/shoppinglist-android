#!/bin/bash

echo "=== Hệ thống Quản lý Cán bộ ==="
echo "Đang khởi động hệ thống..."
echo

# Kiểm tra Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js chưa được cài đặt. Vui lòng cài đặt Node.js trước."
    exit 1
fi

# Kiểm tra npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm chưa được cài đặt. Vui lòng cài đặt npm trước."
    exit 1
fi

echo "✅ Node.js và npm đã sẵn sàng"

# Khởi động Backend
echo "🚀 Khởi động Backend..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "📦 Cài đặt dependencies cho backend..."
    npm install
fi

# Kiểm tra file .env
if [ ! -f ".env" ]; then
    echo "⚠️  Chưa có file .env cho backend!"
    echo "Vui lòng tạo file backend/.env với nội dung:"
    echo "PORT=5000"
    echo "DB_HOST=localhost"
    echo "DB_USER=root"
    echo "DB_PASSWORD=your_password"
    echo "DB_NAME=staff_management"
    echo "JWT_SECRET=your_jwt_secret_key_here"
    echo "JWT_EXPIRES_IN=24h"
    echo
fi

npm run dev &
BACKEND_PID=$!
echo "🌐 Backend đã khởi động tại http://localhost:5000 (PID: $BACKEND_PID)"

# Chờ backend khởi động
sleep 3

# Khởi động Frontend
echo "🎨 Khởi động Frontend..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "📦 Cài đặt dependencies cho frontend..."
    npm install
fi

npm start &
FRONTEND_PID=$!
echo "🌐 Frontend đã khởi động tại http://localhost:3000 (PID: $FRONTEND_PID)"

echo
echo "✅ Hệ thống đã khởi động thành công!"
echo "📊 Dashboard: http://localhost:3000"
echo "🔗 API Backend: http://localhost:5000"
echo
echo "Nhấn Ctrl+C để dừng hệ thống"

# Tạo trap để cleanup khi nhấn Ctrl+C
cleanup() {
    echo
    echo "🛑 Đang dừng hệ thống..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Hệ thống đã dừng"
    exit 0
}

trap cleanup SIGINT

# Chờ các process
wait