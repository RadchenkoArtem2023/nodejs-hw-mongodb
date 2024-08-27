const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(404, 'User not found!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      status: 200,
      message: 'Password has been successfully reset.',
      data: {},
    });
  } catch (error) {
    next(createHttpError(401, 'Token is expired or invalid.'));
  }
};

module.exports = resetPassword;
