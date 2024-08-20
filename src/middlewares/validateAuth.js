const createHttpError = require('http-errors');
const Joi = require('joi');

const validateBodyAuth = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return next(createHttpError(400, `Invalid request data: ${error.message}`));
  }
  next();
};

module.exports = { validateBodyAuth };
