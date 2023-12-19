const express = require('express');
const router = express.Router();
const userFunctions = require('../user');
const jwtFunctions = require('../jwt');
const authenticateToken = require('../middleware/authenticateToken');

// Register endpoint
router.post('/register', async (req, res) => {
  const { name, email, gender, password } = req.body;

  try {
    const newUser = await userFunctions.createUser(name, email, gender, password);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userFunctions.getUserByEmail(email);
    
    // Mengecek apakah ada user dengan email tersebut
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verifikasi password yang diinputkan
    const passwordMatch = await userFunctions.verifyPassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwtFunctions.getJwtToken({ email, name: user.name, gender: user.gender, id: user.id });
    res.json({ token });
  } catch (error) {
    // Mengirim error jika ada kesalahan
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/detail', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    // Mengambil detail akun pengguna berdasarkan user ID
    const userAccount = await userFunctions.getUserAccount(userId);
    res.json(userAccount);
  } catch (error) {
    console.error('Error getting user account:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
