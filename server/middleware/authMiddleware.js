const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    // OPTIONS request is typically sent by browsers for CORS preflight check
    next();
  } else {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: "User isn't logged in" });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: "User isn't logged in" });
    }
  }
};
