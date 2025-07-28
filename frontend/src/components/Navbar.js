import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaHome, FaUsers, FaCog, FaChartBar } from 'react-icons/fa';

const Navbar = () => {
    return (
        <BootstrapNavbar bg="primary" variant="dark" expand="lg" className="mb-3">
            <Container fluid>
                <BootstrapNavbar.Brand>
                    <FaUsers className="me-2" />
                    Hệ thống Quản lý Cán bộ
                </BootstrapNavbar.Brand>
                
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/dashboard">
                            <Nav.Link>
                                <FaHome className="me-1" />
                                Trang chủ
                            </Nav.Link>
                        </LinkContainer>
                        
                        <LinkContainer to="/can-bo">
                            <Nav.Link>
                                <FaUsers className="me-1" />
                                Quản lý Cán bộ
                            </Nav.Link>
                        </LinkContainer>
                        
                        <LinkContainer to="/danh-muc">
                            <Nav.Link>
                                <FaCog className="me-1" />
                                Danh mục
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;