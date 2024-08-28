const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const User = require('../models/user'); // Модель користувача
const ctrlWrapper = require('../utils/ctrlWrapper');

// Налаштування Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

const sendResetEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Перевірка валідності email
    if (!email) {
      throw createHttpError(400, 'Email is required');
    }

    // Перевірка, чи існує користувач з таким email
    console.log('Searching for user with email:', email);
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(404, 'User not found!');
    }
    console.log('User found:', user);

    // Генерація JWT токену для скидання пароля
    console.log('Генерація токену для:', user.email);
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '5m',
    });
    console.log('Токен згенеровано:', token);

    // Створення посилання для скидання пароля
    const resetLink = `${process.env.APP_DOMAIN}/reset-password?token=${token}`;

    // Налаштування email
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Password Reset',
      html: `<p>Click the link below to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`,
    };

    // Надсилання email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {},
    });
  } catch (error) {
    if (
      error.message.includes('Email is required') ||
      error.message.includes('User not found')
    ) {
      next(error);
    } else {
      next(
        createHttpError(
          500,
          'Failed to send the email, please try again later.',
        ),
      );
    }
  }
};

transporter.sendMail(
  {
    from: process.env.SMTP_FROM,
    to: 'test@example.com', // замініть на свою адресу
    subject: 'Test Email',
    text: 'This is a test email',
  },
  (error, info) => {
    if (error) {
      console.log('Error sending test email:', error);
    } else {
      console.log('Test email sent:', info.response);
    }
  },
);

module.exports = {
  sendResetEmail: ctrlWrapper(sendResetEmail),
};
