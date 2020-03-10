const jwt = require('jsonwebtoken');
const { auth } = require('../config');

module.exports = (req, res, next) => {
  try {
    const token = req.get('x-auth-token');
    const isvalid = jwt.verify(token, auth.secret);
    if (!isvalid) throw error;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};
