const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const prisma = require('./prismaclient'); // Importa el cliente de Prisma
const SECRET_KEY = 'your_secret_key';

const app = express();
app.use(bodyParser.json());

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Ruta de autenticación
app.post('/api/auth/login', async (req, res) => {
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

// Ruta para crear un nuevo post
app.post('/api/posts', authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId,
      },
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Ruta para obtener todos los posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Ruta para eliminar un post
app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  try {
    await prisma.post.delete({
      where: { id: postId },
    });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Inicia el servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
