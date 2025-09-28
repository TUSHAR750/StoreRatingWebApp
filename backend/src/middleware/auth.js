// backend/src/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function auth(requiredRole) {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

     
      if (requiredRole) {
        if (Array.isArray(requiredRole)) {
          if (!requiredRole.includes(decoded.role)) return res.status(403).json({ message: 'Access denied' });
        } else if (decoded.role !== requiredRole) {
          return res.status(403).json({ message: 'Access denied' });
        }
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};
