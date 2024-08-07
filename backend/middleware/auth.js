const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.sendStatus(401);

  jwt.verify(token.split(' ')[1], SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
