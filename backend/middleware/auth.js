const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Espera el token en el formato 'Bearer TOKEN'

  if (!token) return res.sendStatus(401); // No autorizado

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Prohibido
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
