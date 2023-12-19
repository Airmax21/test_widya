const pool = require('./db');

// Fungsi query penambahan products pada database
const createProduct = async (name, description, price, userId) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO products (name, description, price, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, userId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

// Fungsi query pencarian product berdasarkan User ID
const getProductsByUserId = async (userId) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM products WHERE user_id = $1', [userId]);
    return result.rows;
  } finally {
    client.release();
  }
};

// Fungsi pencarian melakukan pencarian Product by ID
const getProductById = async (productId) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM products WHERE id = $1', [productId]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

// Fungsi Update product pada database
const updateProduct = async (productId, name, description, price) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
      [name, description, price, productId]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

// Fungsi Hapus product pada database
const deleteProduct = async (productId) => {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM products WHERE id = $1', [productId]);
  } finally {
    client.release();
  }
};

module.exports = { createProduct, getProductsByUserId, getProductById, updateProduct, deleteProduct };
