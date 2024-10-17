const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied, token missing!' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer '

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using JWT secret
    req.user = verified; // Attach the verified user to the request object
    next(); // Continue to the next middleware/route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
