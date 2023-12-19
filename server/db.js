// Digunakan untuk konfigurasi db
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_test_widya',
  password: 'iqbal',
  port: 5432,
});

module.exports = pool;
