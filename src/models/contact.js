const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  isFavourite: { type: Boolean, default: false },
  contactType: {
    type: String,
    enum: ['work', 'home', 'personal'],
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  photo: { type: String },
});

const Contact = model('Contact', contactSchema);

module.exports = Contact;
