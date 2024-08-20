const createError = require('http-errors');
const contactsService = require('../services/contacts');
const ctrlWrapper = require('../utils/ctrlWrapper');
const Contact = require('../models/contact');

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
      contacts,
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
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

//const createContact = async (req, res, next) => {
// const newContact = await contactsService.createContact(req.body);

//  res.status(201).json({
//    status: 201,
//    message: 'Successfully created a contact!',
//    data: newContact,
//  });
//};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateContact(
    contactId,
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
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await contactsService.deleteContact(contactId);

  if (!deletedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();
};

//////////////////////////////////////////////////////////

const createContact = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
    const contact = new Contact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
      userId: req.user._id, // Adding userId from authenticated user
    });

    await contact.save();
    res.status(201).json({ contact });
  } catch (error) {
    next(error);
  }
};

/////////////////////////////////////////////

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
