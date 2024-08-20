const User = require('../models/user');
const Session = require('../models/session');
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');

const registerUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

///////////////////////////////////////

const createSession = async (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });

  const session = new Session({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  await session.save();
  return session;
};

module.exports = { registerUser, createSession };
