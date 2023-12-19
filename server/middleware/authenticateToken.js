const jwt = require('jsonwebtoken');
const secretKey = 'secret_key';

const authenticateToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) return res.status(401).json({ message: 'Unauthorized' });

  // Menghapus "Bearer " dari header Authorization
  const token = authorizationHeader.replace(/^Bearer\s/, '');

  //Verifikasi JWT yang sudah diinputkan
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: err });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;