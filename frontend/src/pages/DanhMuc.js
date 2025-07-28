import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCog } from 'react-icons/fa';

const DanhMuc = () => {
    return (
        <Container fluid>
            <Row className="mb-4">
                <Col>
                    <h2>
                        <FaCog className="me-2" />
                        Quản lý Danh mục
                    </h2>
                </Col>
            </Row>

            <Row>
                <Col md={6} lg={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Header className="bg-primary text-white">
                            <h5 className="mb-0">Giới tính</h5>
                        </Card.Header>
                        <Card.Body>
                            <p>Quản lý danh mục giới tính</p>
                            <small className="text-muted">Chức năng đang phát triển...</small>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} lg={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Header className="bg-success text-white">
                            <h5 className="mb-0">Dân tộc</h5>
                        </Card.Header>
                        <Card.Body>
                            <p>Quản lý danh mục dân tộc</p>
                            <small className="text-muted">Chức năng đang phát triển...</small>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} lg={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Header className="bg-info text-white">
                            <h5 className="mb-0">Đơn vị</h5>
                        </Card.Header>
                        <Card.Body>
                            <p>Quản lý danh mục đơn vị</p>
                            <small className="text-muted">Chức năng đang phát triển...</small>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} lg={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Header className="bg-warning text-white">
                            <h5 className="mb-0">Cấp bậc</h5>
                        </Card.Header>
                        <Card.Body>
                            <p>Quản lý danh mục cấp bậc</p>
                            <small className="text-muted">Chức năng đang phát triển...</small>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} lg={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Header className="bg-secondary text-white">
                            <h5 className="mb-0">Chức vụ</h5>
                        </Card.Header>
                        <Card.Body>
                            <p>Quản lý danh mục chức vụ</p>
                            <small className="text-muted">Chức năng đang phát triển...</small>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <Card className="border-info">
                        <Card.Body className="text-center">
                            <h5 className="text-info">Thông báo</h5>
                            <p className="mb-0">
                                Các trang quản lý danh mục chi tiết đang được phát triển. 
                                Hiện tại, dữ liệu danh mục đã được tạo sẵn và có thể sử dụng trong form thêm/sửa cán bộ.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DanhMuc;