const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/products');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Menambah komponen yang digunakan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Memasukkan router Express
app.use('/auth', authRouter);
app.use('/products', productRouter);

// Menghidupkan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});