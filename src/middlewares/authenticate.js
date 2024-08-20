const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const config = require('../config');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createHttpError(401, 'Access token not provided'));
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return next(createHttpError(401, 'Invalid token'));
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticate;
