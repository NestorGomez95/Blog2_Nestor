const express = require('express');
const prisma = require('../prismaclient');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', verifyToken, async (req, res) => {
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

router.put('/:id', verifyToken, async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const { title, content } = req.body;

  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { title, content },
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  const postId = parseInt(req.params.id, 10);

  try {
    await prisma.post.delete({ where: { id: postId } });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
