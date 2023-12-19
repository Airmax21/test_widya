const bcrypt = require('bcrypt');
const pool = require('./db');

// Fungsi enkripsi password menggunakan bcrypt
const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10);
};

// Fungsi verifikasi password menggunakan bcrypt
const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Fungsi query untuk menambahkan user pada database
const createUser = async (name, email, gender, password) => {
  const hashedPassword = await hashPassword(password);

  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO users (name, email, gender, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, gender, hashedPassword]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

// Fungsi melakukan pencarian berdasarkan email
const getUserByEmail = async (email) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

// Fungsi melakukan pencarian berdasarkan User ID
const getUserAccount = async (userId) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT id, name, email, gender FROM users WHERE id = $1', [userId]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

module.exports = { createUser, getUserByEmail, hashPassword, verifyPassword, getUserAccount };
