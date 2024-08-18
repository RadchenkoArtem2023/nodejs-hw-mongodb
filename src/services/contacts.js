const Contact = require('../models/contact');

const getAllContacts = async ({ page, perPage, sortBy, sortOrder, filter }) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (typeof filter.isFavourite !== 'undefined') {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [count, contacts] = await Promise.all([
    Contact.countDocuments(contactQuery),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(count / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages - page > 0,
  };
};

const getContactById = (id) => Contact.findById(id);

const createContact = (contactData) => Contact.create(contactData);

const updateContact = (id, contactData) =>
  Contact.findByIdAndUpdate(id, contactData, {
    new: true,
    runValidators: true,
  });

const deleteContact = (id) => Contact.findByIdAndDelete(id);

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
