import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import { canBoAPI, danhMucAPI } from '../services/api';

const CanBoForm = () => {
    const navigate = useNavigate();
    const { soHoSo } = useParams();
    const isEdit = !!soHoSo;

    const [formData, setFormData] = useState({
        so_ho_so: '',
        ho_ten: '',
        ngay_sinh: '',
        gioi_tinh_id: '',
        dan_toc_id: '',
        don_vi_id: '',
        cap_bac_id: '',
        chuc_vu_id: '',
        he_so_luong: '',
        can_cuoc_cong_dan: '',
        so_the_dang: '',
        dia_chi: '',
        so_dien_thoai: '',
        email: '',
        ngay_vao_dang: '',
        ngay_vao_lam: '',
        trang_thai: 'Đang làm việc',
        ghi_chu: ''
    });

    const [danhMuc, setDanhMuc] = useState({
        gioiTinh: [],
        danToc: [],
        donVi: [],
        capBac: [],
        chucVu: []
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadDanhMuc();
        if (isEdit) {
            loadCanBo();
        }
    }, [soHoSo]);

    const loadDanhMuc = async () => {
        try {
            const [gioiTinhRes, danTocRes, donViRes, capBacRes, chucVuRes] = await Promise.all([
                danhMucAPI.getAllGioiTinh(),
                danhMucAPI.getAllDanToc(),
                danhMucAPI.getAllDonVi(),
                danhMucAPI.getAllCapBac(),
                danhMucAPI.getAllChucVu()
            ]);

            setDanhMuc({
                gioiTinh: gioiTinhRes.data.data,
                danToc: danTocRes.data.data,
                donVi: donViRes.data.data,
                capBac: capBacRes.data.data,
                chucVu: chucVuRes.data.data
            });
        } catch (error) {
            console.error('Lỗi khi tải danh mục:', error);
            setError('Không thể tải danh mục');
        }
    };

    const loadCanBo = async () => {
        try {
            const response = await canBoAPI.getById(soHoSo);
            const canBo = response.data.data;
            
            // Format dates for input
            if (canBo.ngay_sinh) {
                canBo.ngay_sinh = new Date(canBo.ngay_sinh).toISOString().split('T')[0];
            }
            if (canBo.ngay_vao_dang) {
                canBo.ngay_vao_dang = new Date(canBo.ngay_vao_dang).toISOString().split('T')[0];
            }
            if (canBo.ngay_vao_lam) {
                canBo.ngay_vao_lam = new Date(canBo.ngay_vao_lam).toISOString().split('T')[0];
            }

            setFormData(canBo);
        } catch (error) {
            console.error('Lỗi khi tải thông tin cán bộ:', error);
            setError('Không thể tải thông tin cán bộ');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEdit) {
                await canBoAPI.update(soHoSo, formData);
            } else {
                await canBoAPI.create(formData);
            }
            navigate('/can-bo');
        } catch (error) {
            console.error('Lỗi khi lưu cán bộ:', error);
            setError(error.response?.data?.message || 'Không thể lưu thông tin cán bộ');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid>
            <Row className="mb-4">
                <Col>
                    <Button variant="outline-secondary" onClick={() => navigate('/can-bo')}>
                        <FaArrowLeft className="me-1" />
                        Quay lại
                    </Button>
                </Col>
            </Row>

            <Card>
                <Card.Header>
                    <h4>{isEdit ? 'Sửa thông tin cán bộ' : 'Thêm cán bộ mới'}</h4>
                </Card.Header>
                <Card.Body>
                    {error && (
                        <Alert variant="danger" className="mb-4">
                            {error}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Số hồ sơ *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="so_ho_so"
                                        value={formData.so_ho_so}
                                        onChange={handleChange}
                                        required
                                        disabled={isEdit}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Họ tên *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="ho_ten"
                                        value={formData.ho_ten}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ngày sinh</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="ngay_sinh"
                                        value={formData.ngay_sinh}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Giới tính</Form.Label>
                                    <Form.Select
                                        name="gioi_tinh_id"
                                        value={formData.gioi_tinh_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">Chọn giới tính</option>
                                        {danhMuc.gioiTinh.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.ten_gioi_tinh}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Dân tộc</Form.Label>
                                    <Form.Select
                                        name="dan_toc_id"
                                        value={formData.dan_toc_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">Chọn dân tộc</option>
                                        {danhMuc.danToc.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.ten_dan_toc}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Đơn vị</Form.Label>
                                    <Form.Select
                                        name="don_vi_id"
                                        value={formData.don_vi_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">Chọn đơn vị</option>
                                        {danhMuc.donVi.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.ten_don_vi}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Chức vụ</Form.Label>
                                    <Form.Select
                                        name="chuc_vu_id"
                                        value={formData.chuc_vu_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">Chọn chức vụ</option>
                                        {danhMuc.chucVu.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.ten_chuc_vu}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cấp bậc</Form.Label>
                                    <Form.Select
                                        name="cap_bac_id"
                                        value={formData.cap_bac_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">Chọn cấp bậc</option>
                                        {danhMuc.capBac.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.ten_cap_bac}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hệ số lương</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.01"
                                        name="he_so_luong"
                                        value={formData.he_so_luong}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Căn cước công dân</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="can_cuoc_cong_dan"
                                        value={formData.can_cuoc_cong_dan}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Số thẻ đảng</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="so_the_dang"
                                        value={formData.so_the_dang}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ngày vào đảng</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="ngay_vao_dang"
                                        value={formData.ngay_vao_dang}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ngày vào làm</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="ngay_vao_lam"
                                        value={formData.ngay_vao_lam}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Trạng thái</Form.Label>
                                    <Form.Select
                                        name="trang_thai"
                                        value={formData.trang_thai}
                                        onChange={handleChange}
                                    >
                                        <option value="Đang làm việc">Đang làm việc</option>
                                        <option value="Nghỉ hưu">Nghỉ hưu</option>
                                        <option value="Chuyển công tác">Chuyển công tác</option>
                                        <option value="Thôi việc">Thôi việc</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="so_dien_thoai"
                                        value={formData.so_dien_thoai}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="dia_chi"
                                        value={formData.dia_chi}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Ghi chú</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="ghi_chu"
                                value={formData.ghi_chu}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <div className="d-flex gap-2">
                            <Button type="submit" variant="primary" disabled={loading}>
                                <FaSave className="me-1" />
                                {loading ? 'Đang lưu...' : 'Lưu'}
                            </Button>
                            <Button 
                                type="button" 
                                variant="secondary" 
                                onClick={() => navigate('/can-bo')}
                            >
                                Hủy
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CanBoForm;