// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Login.css';

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Melakukan request register pada server
      const response = await axios.post('http://localhost:3001/auth/register', {
        name,
        email,
        gender,
        password,
      });

      // Cek jika registrasi berhasil
      if (response.status === 201) {
        // Registrasi berhasil, arahkan pengguna ke halaman login
        window.location.href = '/';
      } else {
        // Registrasi tidak berhasil
        console.error('Registration failed:', response.data);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    // Halaman Register
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Form className="login-container">
            <h2>Register</h2>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="login-input"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
              />
            </Form.Group>

            <Form.Group controlId="formGender">
              <Form.Label>Gender:</Form.Label>
              <Form.Control
                as="select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="login-input"
              >
                <option value="" disabled>Pilih Gender</option>
                <option value="laki-laki">Laki-Laki</option>
                <option value="perempuan">Perempuan</option>
              </Form.Control>
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

            <Button variant="primary" onClick={handleRegister} className="login-button">
              Register
            </Button>

            <div className="mt-3">
              <Link to="/" className="register-link">
                Sudah punya akun? Login di sini.
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
