// src/components/UserDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';
import AppNavbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserDetail = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        // Mengambil detail pengguna dari API dengan token
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/auth/detail', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        // Handle error, misalnya redirect ke halaman login jika token tidak valid
        console.error('Error fetching user detail:', error);
        window.location.href = '/';
      }
    };

    fetchUserDetail();
  }, []);

  return (
    <div>
      <AppNavbar />
      <Container className="mt-5">
        <h2>User Detail</h2>
        <Card>
          <Card.Body>
            {user ? (
              <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Gender: {user.gender}</p>
              </div>
            ) : (
              <p>Loading user detail...</p>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default UserDetail;
