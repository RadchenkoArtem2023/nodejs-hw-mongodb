const express = require('express');
const router = express.Router();
const { ctrlWrapper } = require('../middlewares');
const validateBody = require('../middlewares/validateBody');
const isValidId = require('../middlewares/isValidId');
const {
  contactSchema,
  updateContactSchema,
} = require('../validation/contacts');
const ctrl = require('../controllers/contacts');

router.post('/', validateBody(contactSchema), ctrlWrapper(ctrl.addContact));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById));

router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(ctrl.updateContact),
);

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.deleteContact));

module.exports = router;
