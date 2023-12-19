// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppNavbar = () => {
    const handleLogout = () => {
        // Menghapus token dari session storage
        sessionStorage.removeItem('token');
        // Redirect pengguna ke halaman login atau halaman lain setelah logout
        window.location.href = '/';
    };
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>Test Widya</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/user-detail">User Detail</Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavbar;
