const express = require('express');
const { register } = require('../controllers/auth');
const { validateBodyAuth } = require('../middlewares/validateAuth');
const { userRegisterSchema } = require('../validation/userSchemas');
const ctrlWrapper = require('../utils/ctrlWrapper');

const { login } = require('../controllers/auth');
const { userLoginSchema } = require('../validation/userSchemas');

const { refreshSession } = require('../controllers/auth');

const { logout } = require('../controllers/auth');

const router = express.Router();

const { sendResetEmail } = require('../controllers/sendResetEmail');
const { emailSchema } = require('../validation/userSchemas');

const resetPassword = require('../controllers/resetPassword');
const { resetPasswordSchema } = require('../validation/userSchemas');

router.post(
  '/register',
  validateBodyAuth(userRegisterSchema),
  ctrlWrapper(register),
);

router.post('/login', validateBodyAuth(userLoginSchema), ctrlWrapper(login));

router.post('/refresh', ctrlWrapper(refreshSession));

router.post('/logout', logout);

router.post(
  '/send-reset-email',
  validateBodyAuth(emailSchema),
  ctrlWrapper(sendResetEmail),
);

router.post(
  '/reset-pwd',
  validateBodyAuth(resetPasswordSchema),
  ctrlWrapper(resetPassword),
);

module.exports = router;
