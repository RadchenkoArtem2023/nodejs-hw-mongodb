const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const { ctrlWrapper } = require('../middlewares');
const validateBody = require('../middlewares/validateBody');
const isValidId = require('../middlewares/isValidId');
const {
  contactSchema,
  contactUpdateSchema,
} = require('../validation/contacts');

// GET all contacts
router.get('/', ctrlWrapper(contactsController.getAllContacts));

// GET a contact by ID
router.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsController.getContactById),
);

// POST a new contact
router.post(
  '/',
  validateBody(contactSchema),
  ctrlWrapper(contactsController.addContact),
);

// DELETE a contact by ID
router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsController.deleteContact),
);

// PATCH update a contact by ID
router.patch(
  '/:contactId',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(contactsController.updateContact),
);

module.exports = router;
