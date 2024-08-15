const contactsService = require('../services/contacts');
const createError = require('http-errors');
const Contact = require('../models/contact');
const ctrlWrapper = require('../utils/ctrlWrapper');

const getAllContacts = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    ...filter
  } = req.query;
  const skip = (page - 1) * perPage;

  const totalItems = await Contact.countDocuments(filter);
  const contacts = await Contact.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(parseInt(perPage));

  const totalPages = Math.ceil(totalItems / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      page: parseInt(page),
      perPage: parseInt(perPage),
      totalItems,
      totalPages,
      hasPreviousPage,
      hasNextPage,
    },
  });
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsService.getContactById(req.params.contactId);
    if (!contact) {
      throw createError(404, 'Contact not found');
    }
    res.json({ status: 200, data: contact });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const newContact = await contactsService.createContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const updatedContact = await contactsService.updateContact(
      req.params.contactId,
      req.body,
    );
    if (!updatedContact) {
      throw createError(404, 'Contact not found');
    }
    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const deletedContact = await contactsService.deleteContact(
      req.params.contactId,
    );
    if (!deletedContact) {
      throw createError(404, 'Contact not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
