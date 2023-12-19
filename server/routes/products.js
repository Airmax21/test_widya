// routes/products.js
const express = require('express');
const router = express.Router();
const productFunctions = require('../product');
const authenticateToken = require('../middleware/authenticateToken');

//  Endpoint untuk tambah product
router.post('/', authenticateToken, async (req, res) => {
  const { name, description, price } = req.body;
  const userId = req.user.id;

  try {
    const newProduct = await productFunctions.createProduct(name, description, price, userId);
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const products = await productFunctions.getProductsByUserId(userId);
    res.json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint untuk update product
router.put('/:productId', authenticateToken, async (req, res) => {
  const productId = req.params.productId;
  const { name, description, price } = req.body;
  const userId = req.user.id;

  try {
    const product = await productFunctions.getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Cek apakah produk kepemilikan user
    if (product.user_id !== userId) {
      return res.status(403).json({ message: 'Forbidden - You do not own this product' });
    }

    const updatedProduct = await productFunctions.updateProduct(productId, name, description, price);
    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint untuk hapus product
router.delete('/:productId', authenticateToken, async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user.id;

  try {
    const product = await productFunctions.getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Cek apakah produk kepemilikan user
    if (product.user_id !== userId) {
      return res.status(403).json({ message: 'Forbidden - You do not own this product' });
    }

    await productFunctions.deleteProduct(productId);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;