#!/bin/bash

echo "🚀 Khởi động Hệ thống Quản lý Cán bộ"
echo "=================================="

# Kiểm tra Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js chưa được cài đặt!"
    echo "Vui lòng cài đặt Node.js 16+ trước khi tiếp tục"
    exit 1
fi

# Kiểm tra MySQL
if ! command -v mysql &> /dev/null; then
    echo "⚠️ MySQL command không tìm thấy!"
    echo "Đảm bảo MySQL đã được cài đặt và đang chạy"
fi

echo "✅ Môi trường đã sẵn sàng"

# Tạo thư mục uploads nếu chưa có
if [ ! -d "uploads" ]; then
    echo "📁 Tạo thư mục uploads..."
    mkdir uploads
fi

# Khởi động Backend
echo "🔧 Khởi động Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "📦 Cài đặt dependencies cho Backend..."
    npm install
fi

# Kiểm tra file .env
if [ ! -f ".env" ]; then
    echo "⚙️ Tạo file .env từ template..."
    cp .env .env.backup 2>/dev/null || true
    echo "❗ Vui lòng cấu hình database trong file .env"
fi

echo "🌐 Khởi động server Backend tại http://localhost:3000"
npm run dev &
BACKEND_PID=$!

# Đợi backend khởi động
sleep 3

# Kiểm tra backend đã chạy chưa
if ! curl -s http://localhost:3000/api/health > /dev/null; then
    echo "❌ Backend không thể khởi động!"
    echo "Kiểm tra cấu hình database trong file backend/.env"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo "✅ Backend đã khởi động thành công!"

# Khởi động Frontend
echo "🎨 Khởi động Frontend..."
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "📦 Cài đặt dependencies cho Frontend..."
    npm install
    echo "📦 Cài đặt thêm libraries cần thiết..."
    npm install axios react-router-dom antd
fi

echo "🌐 Khởi động Frontend tại http://localhost:3001"
PORT=3001 npm start &
FRONTEND_PID=$!

# Thông báo hoàn thành
echo ""
echo "🎉 Hệ thống đã khởi động thành công!"
echo "=================================="
echo "🔙 Backend API: http://localhost:3000"
echo "🎨 Frontend UI: http://localhost:3001"
echo "📊 Health Check: http://localhost:3000/api/health"
echo ""
echo "👤 Tài khoản mặc định:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "📝 Logs:"
echo "   Backend PID: $BACKEND_PID"
echo "   Frontend PID: $FRONTEND_PID"
echo ""
echo "🛑 Để dừng hệ thống, nhấn Ctrl+C"

# Hàm dọn dẹp khi thoát
cleanup() {
    echo ""
    echo "🛑 Đang dừng hệ thống..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Đã dừng hệ thống!"
    exit 0
}

# Bắt tín hiệu dừng
trap cleanup SIGINT SIGTERM

# Giữ script chạy
wait