// src/components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/auth/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { token } = response.data;

      // Simpan token ke dalam session
      sessionStorage.setItem('token', token);
      window.location.href = '/user-detail';
    } catch (error) {
      console.error('Error during login: ' + error);

      // Jika respons memiliki status 404, tampilkan pesan kesalahan khusus
      if (error.response && error.response.status === 404) {
        setError('User not found');
      } else if (error.response && error.response.status === 500) {
        // Handle error, misalnya tampilkan pesan kesalahan umum ke pengguna
        setError('Internal Server Error');
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Form className="login-container">
            <h2>Login</h2>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin} className="login-button">
              Login
            </Button>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            <div className="mt-3">
              <Link to="/register" className="register-link">
                Belum punya akun? Register di sini.
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
