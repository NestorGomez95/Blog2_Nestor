const express = require('express');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaclient'); // Importa el cliente Prisma
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

const SECRET_KEY = 'your_secret_key';

// Ruta de autenticación (inicio de sesión)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Ruta para verificar el token (opcional, para pruebas)
router.get('/verify', authenticateToken, (req, res) => {
  res.json({ message: 'Token is valid', user: req.user });
});

module.exports = router;
