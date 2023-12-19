// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Table, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './Navbar';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Melakukan request pada server untuk get products
                const response = await axios.get('http://localhost:3001/products', {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });
                setProducts(response.data);
            } catch (error) {
                // Handle error, misalnya redirect ke halaman login jika token tidak valid
                console.error('Error fetching products:', error);
                window.location.href = '/';
            }
        };
        fetchProducts();
    }, []);
    
    const handleAdd = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setFormData({
            name: '',
            description: '',
            price: '',
        });
    };

    const handleSaveAdd = async () => {
        try {
            await axios.post(
                'http://localhost:3001/products',
                {
                    name: formData.name,
                    description: formData.description,
                    price: formData.price,
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                }
            );

            // Tambahkan produk baru ke daftar setelah penambahan
            setProducts((prevProducts) => [
                ...prevProducts,
                { name: formData.name, description: formData.description, price: formData.price },
            ]);

            // Tutup modal setelah berhasil ditambahkan
            handleCloseAddModal();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEdit = (productId) => {
        const selectedProduct = products.find((product) => product.id === productId);
        if (selectedProduct) {
            setFormData({
                name: selectedProduct.name,
                description: selectedProduct.description,
                price: selectedProduct.price,
            });
            setSelectedProductId(productId);
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProductId(null);
        setFormData({
            name: '',
            description: '',
            price: '',
        });
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(
                `http://localhost:3001/products/${selectedProductId}`,
                {
                    name: formData.name,
                    description: formData.description,
                    price: formData.price,
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                }
            );

            // Update daftar produk setelah pengeditan
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === selectedProductId
                        ? { ...product, name: formData.name, description: formData.description, price: formData.price }
                        : product
                )
            );

            // Tutup modal setelah berhasil diedit
            handleCloseModal();
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDelete = (productId) => {
        setSelectedProductId(productId);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedProductId(null);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/products/${selectedProductId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });

            // Hapus produk dari daftar setelah penghapusan
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== selectedProductId)
            );

            // Tutup modal setelah berhasil dihapus
            handleCloseDeleteModal();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <AppNavbar />
            <Container className="mt-4">
                <Row>
                    <Col>
                        <h2>Product Dashboard</h2>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Button variant="success" onClick={handleAdd}>
                            Add Product
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>Rp. {product.price}</td>
                                        <td>
                                            <Button variant="info" onClick={() => handleEdit(product.id)}>
                                                Edit
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDelete(product.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                {/* Modal Form untuk Tambah */}
                <Modal show={showAddModal} onHide={handleCloseAddModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formProductName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formProductDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formProductPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAddModal}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={handleSaveAdd}>
                            Add Product
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Form untuk Edit */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formProductName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formProductDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formProductPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSaveEdit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Konfirmasi Hapus */}
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this product?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleConfirmDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default Dashboard;
