import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FaUsers, FaBuilding, FaChartBar, FaUserCheck } from 'react-icons/fa';
import { canBoAPI } from '../services/api';

const Dashboard = () => {
    const [statsData, setStatsData] = useState({
        byDonVi: [],
        byAge: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadStatistics();
    }, []);

    const loadStatistics = async () => {
        try {
            setLoading(true);
            const [donViResponse, ageResponse] = await Promise.all([
                canBoAPI.getStatsByDonVi(),
                canBoAPI.getStatsByAge()
            ]);

            setStatsData({
                byDonVi: donViResponse.data.data,
                byAge: ageResponse.data.data
            });
        } catch (error) {
            console.error('Lỗi khi tải thống kê:', error);
            setError('Không thể tải dữ liệu thống kê');
        } finally {
            setLoading(false);
        }
    };

    const totalStaff = statsData.byDonVi.reduce((sum, item) => sum + item.so_luong_can_bo, 0);
    const workingStaff = statsData.byDonVi.reduce((sum, item) => sum + item.dang_lam_viec, 0);
    const retiredStaff = statsData.byDonVi.reduce((sum, item) => sum + item.nghi_huu, 0);

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
                    <h2>
                        <FaChartBar className="me-2" />
                        Dashboard - Tổng quan hệ thống
                    </h2>
                </Col>
            </Row>

            {error && (
                <Alert variant="danger" className="mb-4">
                    {error}
                </Alert>
            )}

            {/* Thống kê tổng quan */}
            <Row className="mb-4">
                <Col md={3}>
                    <Card className="text-center border-primary">
                        <Card.Body>
                            <FaUsers size={40} className="text-primary mb-3" />
                            <Card.Title className="h3">{totalStaff}</Card.Title>
                            <Card.Text>Tổng số cán bộ</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center border-success">
                        <Card.Body>
                            <FaUserCheck size={40} className="text-success mb-3" />
                            <Card.Title className="h3">{workingStaff}</Card.Title>
                            <Card.Text>Đang làm việc</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center border-warning">
                        <Card.Body>
                            <FaUsers size={40} className="text-warning mb-3" />
                            <Card.Title className="h3">{retiredStaff}</Card.Title>
                            <Card.Text>Đã nghỉ hưu</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center border-info">
                        <Card.Body>
                            <FaBuilding size={40} className="text-info mb-3" />
                            <Card.Title className="h3">{statsData.byDonVi.length}</Card.Title>
                            <Card.Text>Số đơn vị</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                {/* Thống kê theo đơn vị */}
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <h5>
                                <FaBuilding className="me-2" />
                                Thống kê theo đơn vị
                            </h5>
                        </Card.Header>
                        <Card.Body>
                            {statsData.byDonVi.length > 0 ? (
                                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    {statsData.byDonVi.map((item, index) => (
                                        <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 border-bottom">
                                            <div>
                                                <strong>{item.ten_don_vi}</strong>
                                            </div>
                                            <div className="text-end">
                                                <div className="text-primary fw-bold">{item.so_luong_can_bo} người</div>
                                                <small className="text-muted">
                                                    Đang LV: {item.dang_lam_viec} | Nghỉ hưu: {item.nghi_huu}
                                                </small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted">Chưa có dữ liệu</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* Thống kê theo độ tuổi */}
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <h5>
                                <FaChartBar className="me-2" />
                                Thống kê theo độ tuổi
                            </h5>
                        </Card.Header>
                        <Card.Body>
                            {statsData.byAge.length > 0 ? (
                                <div>
                                    {statsData.byAge.map((item, index) => {
                                        const percentage = totalStaff > 0 ? ((item.so_luong / totalStaff) * 100).toFixed(1) : 0;
                                        return (
                                            <div key={index} className="mb-3">
                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                    <span>{item.nhom_tuoi}</span>
                                                    <span className="fw-bold">{item.so_luong} người ({percentage}%)</span>
                                                </div>
                                                <div className="progress" style={{ height: '20px' }}>
                                                    <div 
                                                        className="progress-bar" 
                                                        role="progressbar" 
                                                        style={{ width: `${percentage}%` }}
                                                        aria-valuenow={percentage} 
                                                        aria-valuemin="0" 
                                                        aria-valuemax="100"
                                                    >
                                                        {percentage}%
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-muted">Chưa có dữ liệu</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;