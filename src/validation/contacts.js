const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').optional(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').optional(),
}).or('name', 'phoneNumber', 'email', 'isFavourite', 'contactType');

module.exports = {
  contactSchema,
  updateContactSchema,
};
