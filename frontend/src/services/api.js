import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - redirect to login
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// CÁN BỘ APIs
export const canBoAPI = {
    // Lấy danh sách cán bộ
    getAll: (page = 1, limit = 10, search = '') => {
        return api.get(`/api/can-bo?page=${page}&limit=${limit}&search=${search}`);
    },
    
    // Lấy chi tiết cán bộ
    getById: (soHoSo) => {
        return api.get(`/api/can-bo/${soHoSo}`);
    },
    
    // Thêm cán bộ mới
    create: (data) => {
        return api.post('/api/can-bo', data);
    },
    
    // Cập nhật cán bộ
    update: (soHoSo, data) => {
        return api.put(`/api/can-bo/${soHoSo}`, data);
    },
    
    // Xóa cán bộ
    delete: (soHoSo) => {
        return api.delete(`/api/can-bo/${soHoSo}`);
    },
    
    // Thống kê theo đơn vị
    getStatsByDonVi: () => {
        return api.get('/api/can-bo/stats/don-vi');
    },
    
    // Thống kê theo tuổi
    getStatsByAge: () => {
        return api.get('/api/can-bo/stats/tuoi');
    }
};

// DANH MỤC APIs
export const danhMucAPI = {
    // Giới tính
    getAllGioiTinh: () => api.get('/api/danh-muc/gioi-tinh'),
    createGioiTinh: (data) => api.post('/api/danh-muc/gioi-tinh', data),
    updateGioiTinh: (id, data) => api.put(`/api/danh-muc/gioi-tinh/${id}`, data),
    deleteGioiTinh: (id) => api.delete(`/api/danh-muc/gioi-tinh/${id}`),
    
    // Dân tộc
    getAllDanToc: () => api.get('/api/danh-muc/dan-toc'),
    createDanToc: (data) => api.post('/api/danh-muc/dan-toc', data),
    updateDanToc: (id, data) => api.put(`/api/danh-muc/dan-toc/${id}`, data),
    deleteDanToc: (id) => api.delete(`/api/danh-muc/dan-toc/${id}`),
    
    // Đơn vị
    getAllDonVi: () => api.get('/api/danh-muc/don-vi'),
    getDonViById: (id) => api.get(`/api/danh-muc/don-vi/${id}`),
    createDonVi: (data) => api.post('/api/danh-muc/don-vi', data),
    updateDonVi: (id, data) => api.put(`/api/danh-muc/don-vi/${id}`, data),
    deleteDonVi: (id) => api.delete(`/api/danh-muc/don-vi/${id}`),
    
    // Cấp bậc
    getAllCapBac: () => api.get('/api/danh-muc/cap-bac'),
    createCapBac: (data) => api.post('/api/danh-muc/cap-bac', data),
    updateCapBac: (id, data) => api.put(`/api/danh-muc/cap-bac/${id}`, data),
    deleteCapBac: (id) => api.delete(`/api/danh-muc/cap-bac/${id}`),
    
    // Chức vụ
    getAllChucVu: () => api.get('/api/danh-muc/chuc-vu'),
    createChucVu: (data) => api.post('/api/danh-muc/chuc-vu', data),
    updateChucVu: (id, data) => api.put(`/api/danh-muc/chuc-vu/${id}`, data),
    deleteChucVu: (id) => api.delete(`/api/danh-muc/chuc-vu/${id}`)
};

export default api;