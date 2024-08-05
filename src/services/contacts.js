// src/services/contacts.js
const Contact = require('../models/contact');

const getAll = async () => {
  return await Contact.find({});
};

const getContactById = (id) => Contact.findById(id);

const createContact = (contactData) => Contact.create(contactData);

const updateContact = (id, contactData) =>
  Contact.findByIdAndUpdate(id, contactData, { new: true });

const deleteContact = (id) => Contact.findByIdAndDelete(id);

module.exports = {
  getAll,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
