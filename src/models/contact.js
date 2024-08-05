const mongoose = require('mongoose');

const { Schema } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  isFavourite: {
    type: Boolean,
    default: false,
  },
  contactType: {
    type: String,
    required: true,
  },
});

// Перевірка, чи модель вже існує
const Contact =
  mongoose.models.Contact || mongoose.model('Contact', contactSchema);

module.exports = Contact;
