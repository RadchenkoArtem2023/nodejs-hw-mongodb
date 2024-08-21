const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  try {
    console.log('Checking authorization header:', req.headers.authorization);
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw createHttpError(401, 'Invalid token');
    }

    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded userId:', userId);
      const user = await User.findById(userId);
      console.log('Found user:', user);

      if (!user) {
        throw createHttpError(401, 'User not found');
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Error verifying token:', error.message);
      throw createHttpError(401, 'Invalid token');
    }
  } catch (error) {
    next(error);
  }
};
module.exports = authenticate;
