const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Extract token from header and remove quotes if present
  const token = req.headers['authorization']?.split(' ')[1]?.replace(/^"|"$/g, '');

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err); // Debug log
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    req.user = decoded; // Attach decoded token to request
    
    next();
  });
};

module.exports = verifyToken;
