const express = require('express');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaclient');
const router = express.Router();

const SECRET_KEY = 'your_secret_key';

// Ruta de autenticación
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/verify', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ isAuthenticated: false, isAdmin: false });

  jwt.verify(token.split(' ')[1], SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ isAuthenticated: false, isAdmin: false });
    res.json({ isAuthenticated: true, isAdmin: user.isAdmin });
  });
});

module.exports = router;
