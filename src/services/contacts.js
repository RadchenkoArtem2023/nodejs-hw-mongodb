const Contact = require('../models/contact');

const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

module.exports = {
  getAllContacts,
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact;
};

module.exports = {
  getAllContacts,
  getContactById,
};

const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      required: true,
    },
  },
  { timestamps: true },
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
