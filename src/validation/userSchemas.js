const Joi = require('joi');

const userRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

//////////////////////////////////

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  userId: Joi.forbidden(),
});

module.exports = { userRegisterSchema, userLoginSchema };
