const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const { ctrlWrapper } = require('../middlewares');
const validateBody = require('../middlewares/validateBody');
const isValidId = require('../middlewares/isValidId');
const { contactSchema } = require('../validation/contacts');
const ctrl = require('../controllers/contacts');

router.get('/', contactsController.getAllContacts);
router.get('/:contactId', contactsController.getContactById);
router.post('/', contactsController.createContact);
router.patch('/:contactId', contactsController.updateContact);
router.delete('/:contactId', contactsController.deleteContact);
router.post('/', validateBody(contactSchema), ctrlWrapper(ctrl.addContact));
router.patch(
  '/:contactId',
  isValidId,
  validateBody(contactSchema),
  ctrlWrapper(ctrl.updateContact),
);

module.exports = router;
