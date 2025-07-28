import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Alert, Badge, Pagination } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { canBoAPI } from '../services/api';

const CanBoList = () => {
    const [canBoList, setCanBoList] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [selectedCanBo, setSelectedCanBo] = useState(null);
    
    const navigate = useNavigate();
    const limit = 10;

    useEffect(() => {
        loadCanBoList();
    }, [currentPage, searchTerm]);

    const loadCanBoList = async () => {
        try {
            setLoading(true);
            const response = await canBoAPI.getAll(currentPage, limit, searchTerm);
            setCanBoList(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Lỗi khi tải danh sách cán bộ:', error);
            setError('Không thể tải danh sách cán bộ');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        loadCanBoList();
    };

    const handleDelete = async (soHoSo) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa cán bộ này?')) {
            try {
                await canBoAPI.delete(soHoSo);
                loadCanBoList();
                setError('');
            } catch (error) {
                console.error('Lỗi khi xóa cán bộ:', error);
                setError('Không thể xóa cán bộ');
            }
        }
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

    const renderPagination = () => {
        if (!pagination.total_pages || pagination.total_pages <= 1) return null;

        let items = [];
        const current = pagination.current_page;
        const total = pagination.total_pages;

        // Previous button
        items.push(
            <Pagination.Prev 
                key="prev" 
                disabled={current === 1}
                onClick={() => setCurrentPage(current - 1)}
            />
        );

        // Page numbers
        for (let page = Math.max(1, current - 2); page <= Math.min(total, current + 2); page++) {
            items.push(
                <Pagination.Item
                    key={page}
                    active={page === current}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </Pagination.Item>
            );
        }

        // Next button
        items.push(
            <Pagination.Next 
                key="next" 
                disabled={current === total}
                onClick={() => setCurrentPage(current + 1)}
            />
        );

        return <Pagination>{items}</Pagination>;
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

    return (
        <Container fluid>
            <Row className="mb-4">
                <Col>
                    <h2>Quản lý Cán bộ</h2>
                </Col>
                <Col xs="auto">
                    <Link to="/can-bo/add">
                        <Button variant="primary">
                            <FaPlus className="me-1" />
                            Thêm cán bộ
                        </Button>
                    </Link>
                </Col>
            </Row>

            {error && (
                <Alert variant="danger" className="mb-4">
                    {error}
                </Alert>
            )}

            <Card>
                <Card.Header>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h5 className="mb-0">Danh sách cán bộ</h5>
                        </Col>
                        <Col md={6}>
                            <Form onSubmit={handleSearch}>
                                <div className="d-flex">
                                    <Form.Control
                                        type="text"
                                        placeholder="Tìm kiếm theo tên, số hồ sơ, CCCD..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Button type="submit" variant="outline-primary" className="ms-2">
                                        <FaSearch />
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body className="p-0">
                    {canBoList.length > 0 ? (
                        <>
                            <Table responsive striped hover className="mb-0">
                                <thead className="table-dark">
                                    <tr>
                                        <th>STT</th>
                                        <th>Số hồ sơ</th>
                                        <th>Họ tên</th>
                                        <th>Ngày sinh</th>
                                        <th>Giới tính</th>
                                        <th>Đơn vị</th>
                                        <th>Chức vụ</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {canBoList.map((canBo, index) => (
                                        <tr key={canBo.so_ho_so}>
                                            <td>{(currentPage - 1) * limit + index + 1}</td>
                                            <td>
                                                <Link 
                                                    to={`/can-bo/${canBo.so_ho_so}`}
                                                    className="text-decoration-none fw-bold"
                                                >
                                                    {canBo.so_ho_so}
                                                </Link>
                                            </td>
                                            <td>{canBo.ho_ten}</td>
                                            <td>
                                                {canBo.ngay_sinh ? 
                                                    new Date(canBo.ngay_sinh).toLocaleDateString('vi-VN') : 
                                                    '-'
                                                }
                                            </td>
                                            <td>{canBo.ten_gioi_tinh || '-'}</td>
                                            <td>{canBo.ten_don_vi || '-'}</td>
                                            <td>{canBo.ten_chuc_vu || '-'}</td>
                                            <td>
                                                <Badge bg={getTrangThaiColor(canBo.trang_thai)}>
                                                    {canBo.trang_thai}
                                                </Badge>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-1">
                                                    <Link to={`/can-bo/${canBo.so_ho_so}`}>
                                                        <Button size="sm" variant="outline-info">
                                                            <FaEye />
                                                        </Button>
                                                    </Link>
                                                    <Link to={`/can-bo/edit/${canBo.so_ho_so}`}>
                                                        <Button size="sm" variant="outline-warning">
                                                            <FaEdit />
                                                        </Button>
                                                    </Link>
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline-danger"
                                                        onClick={() => handleDelete(canBo.so_ho_so)}
                                                    >
                                                        <FaTrash />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            
                            {pagination.total_pages > 1 && (
                                <div className="d-flex justify-content-between align-items-center p-3">
                                    <div className="text-muted">
                                        Hiển thị {(currentPage - 1) * limit + 1} - {Math.min(currentPage * limit, pagination.total)} 
                                        trong tổng số {pagination.total} bản ghi
                                    </div>
                                    {renderPagination()}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-muted">Không có dữ liệu cán bộ</p>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CanBoList;