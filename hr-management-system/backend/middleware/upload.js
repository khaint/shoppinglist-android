const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Tạo thư mục upload nếu chưa tồn tại
const createUploadDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Cấu hình storage cho multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../../uploads');
        createUploadDir(uploadPath);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Tạo tên file unique với timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const fileName = file.fieldname + '-' + uniqueSuffix + fileExtension;
        cb(null, fileName);
    }
});

// Kiểm tra loại file
const fileFilter = (req, file, cb) => {
    // Chấp nhận các file ảnh và PDF
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file ảnh (JPEG, JPG, PNG, GIF) và tài liệu (PDF, DOC, DOCX)'));
    }
};

// Cấu hình multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // Giới hạn 10MB
    },
    fileFilter: fileFilter
});

// Middleware xử lý lỗi upload
const handleUploadError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File quá lớn. Giới hạn 10MB' });
        }
        return res.status(400).json({ message: 'Lỗi upload file: ' + error.message });
    }
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
};

module.exports = {
    upload,
    handleUploadError
};