const jwt = require('jsonwebtoken');
const secretKey = 'secret_key';

// Fungsi generate JWT
function getJwtToken(data) {
  return jwt.sign(data, secretKey, { expiresIn: '1h' }); // Token berlaku selama 1 jam
}

// Fungsi melakukan verifikasi JWT
function verifyJwtToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

module.exports = { getJwtToken, verifyJwtToken };