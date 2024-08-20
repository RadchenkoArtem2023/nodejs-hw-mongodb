const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { registerUser } = require('../services/auth');
const { createSession } = require('../services/auth');
const jwt = require('jsonwebtoken');
const Session = require('../models/session');
const config = require('../config');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw createHttpError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await registerUser({ name, email, password: hashedPassword });

    res.status(201).json({
      status: 'success',
      message: 'Successfully registered a user!',
      data: { name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

////////////////////////////////////////////////////////

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw createHttpError(401, 'Invalid email or password');
    }

    const session = await createSession(user._id);

    res.cookie('refreshToken', session.refreshToken, { httpOnly: true });

    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in a user!',
      data: { accessToken: session.accessToken },
    });
  } catch (error) {
    next(error);
  }
};

////////////////////////////////////////////////////////

const refreshSession = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw createHttpError(401, 'Refresh token not provided');
    }

    const session = await Session.findOne({ refreshToken });
    if (!session || session.refreshTokenValidUntil < Date.now()) {
      throw createHttpError(401, 'Refresh token expired');
    }

    // Створіть новий сеанс та видаліть старий
    await Session.deleteOne({ _id: session._id });
    const newSession = await createSession(session.userId);

    res.cookie('refreshToken', newSession.refreshToken, { httpOnly: true });
    res.status(200).json({
      status: 'success',
      message: 'Successfully refreshed a session!',
      data: { accessToken: newSession.accessToken },
    });
  } catch (error) {
    next(error);
  }
};

////////////////////////////////////////////////////////

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw createHttpError(401, 'No refresh token found');
    }

    await Session.deleteOne({ refreshToken });
    res.clearCookie('refreshToken');

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, refreshSession, logout };
