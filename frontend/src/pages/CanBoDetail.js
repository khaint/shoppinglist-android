import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaUser } from 'react-icons/fa';
import { canBoAPI } from '../services/api';

const CanBoDetail = () => {
    const { soHoSo } = useParams();
    const navigate = useNavigate();
    const [canBo, setCanBo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCanBo();
    }, [soHoSo]);

    const loadCanBo = async () => {
        try {
            setLoading(true);
            const response = await canBoAPI.getById(soHoSo);
            setCanBo(response.data.data);
        } catch (error) {
            console.error('Lỗi khi tải thông tin cán bộ:', error);
            setError('Không thể tải thông tin cán bộ');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const getTrangThaiColor = (trangThai) => {
        switch (trangThai) {
            case 'Đang làm việc':
                return 'success';
            case 'Nghỉ hưu':
                return 'warning';
            case 'Chuyển công tác':
                return 'info';
            case 'Thôi việc':
                return 'danger';
            default:
                return 'secondary';
        }
    };

    if (loading) {
        return (
            <Container>
                <div className="text-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Đang tải...</span>
                    </div>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert variant="danger" className="mt-4">
                    {error}
                </Alert>
            </Container>
        );
    }

    if (!canBo) {
        return (
            <Container>
                <Alert variant="warning" className="mt-4">
                    Không tìm thấy thông tin cán bộ
                </Alert>
            </Container>
        );
    }

    return (
        <Container fluid>
            <Row className="mb-4">
                <Col>
                    <Button variant="outline-secondary" onClick={() => navigate('/can-bo')}>
                        <FaArrowLeft className="me-1" />
                        Quay lại danh sách
                    </Button>
                </Col>
                <Col xs="auto">
                    <Link to={`/can-bo/edit/${soHoSo}`}>
                        <Button variant="primary">
                            <FaEdit className="me-1" />
                            Chỉnh sửa
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Card>
                <Card.Header className="bg-primary text-white">
                    <Row className="align-items-center">
                        <Col>
                            <h4 className="mb-0">
                                <FaUser className="me-2" />
                                Hồ sơ cán bộ: {canBo.so_ho_so}
                            </h4>
                        </Col>
                        <Col xs="auto">
                            <Badge bg={getTrangThaiColor(canBo.trang_thai)} className="fs-6">
                                {canBo.trang_thai}
                            </Badge>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <h5 className="text-primary mb-3">Thông tin cá nhân</h5>
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td className="fw-bold" style={{width: '40%'}}>Họ tên:</td>
                                        <td>{canBo.ho_ten}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Ngày sinh:</td>
                                        <td>{formatDate(canBo.ngay_sinh)}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Giới tính:</td>
                                        <td>{canBo.ten_gioi_tinh || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Dân tộc:</td>
                                        <td>{canBo.ten_dan_toc || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">CCCD:</td>
                                        <td>{canBo.can_cuoc_cong_dan || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Số thẻ đảng:</td>
                                        <td>{canBo.so_the_dang || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Ngày vào đảng:</td>
                                        <td>{formatDate(canBo.ngay_vao_dang)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                        
                        <Col md={6}>
                            <h5 className="text-primary mb-3">Thông tin công tác</h5>
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td className="fw-bold" style={{width: '40%'}}>Đơn vị:</td>
                                        <td>{canBo.ten_don_vi || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Chức vụ:</td>
                                        <td>{canBo.ten_chuc_vu || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Cấp bậc:</td>
                                        <td>{canBo.ten_cap_bac || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Hệ số lương:</td>
                                        <td>{canBo.he_so_luong || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Ngày vào làm:</td>
                                        <td>{formatDate(canBo.ngay_vao_lam)}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Trạng thái:</td>
                                        <td>
                                            <Badge bg={getTrangThaiColor(canBo.trang_thai)}>
                                                {canBo.trang_thai}
                                            </Badge>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col md={6}>
                            <h5 className="text-primary mb-3">Thông tin liên hệ</h5>
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td className="fw-bold" style={{width: '40%'}}>Số điện thoại:</td>
                                        <td>{canBo.so_dien_thoai || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Email:</td>
                                        <td>{canBo.email || '-'}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Địa chỉ:</td>
                                        <td>{canBo.dia_chi || '-'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                        
                        <Col md={6}>
                            <h5 className="text-primary mb-3">Ghi chú</h5>
                            <div className="border rounded p-3 bg-light">
                                {canBo.ghi_chu || 'Không có ghi chú'}
                            </div>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col>
                            <h5 className="text-primary mb-3">Thông tin hệ thống</h5>
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td className="fw-bold" style={{width: '20%'}}>Ngày tạo:</td>
                                        <td>{formatDate(canBo.created_at)}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">Cập nhật lần cuối:</td>
                                        <td>{formatDate(canBo.updated_at)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CanBoDetail;