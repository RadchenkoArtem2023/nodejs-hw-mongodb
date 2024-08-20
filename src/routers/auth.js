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

router.post(
  '/register',
  validateBodyAuth(userRegisterSchema),
  ctrlWrapper(register),
);

router.post('/login', validateBodyAuth(userLoginSchema), ctrlWrapper(login));

router.post('/refresh', refreshSession);

router.post('/logout', logout);

module.exports = router;
