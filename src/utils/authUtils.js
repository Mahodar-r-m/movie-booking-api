const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY; // Replace with your actual secret key

const generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: process.env.JWT_TOKEN_EXPIRES });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from headers
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: Token missing' });
  }
  try {
    const decodedToken = verifyToken(token);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};

module.exports = {
  generateToken,
  verifyToken,
  authenticate,
};
