const jwt = require('jsonwebtoken');
const { auth } = require('../config');

let Auth = {};

Auth.getToken = async (req, res, next) => {
  const { user, password } = req.body;
  if (user === auth.user && password === auth.password) {
    const token = jwt.sign(password, auth.secret);
    return res.status(200).json({ token });
  }
  return res.status(401).json({ error: 'Invalid user or password.' });
};

module.exports = Auth;
