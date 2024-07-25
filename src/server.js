const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http')();
const {
  getAllContacts,
  getContactById,
} = require('./controllers/contactsController');

function setupServer() {
  const app = express();

  app.use(cors());
  app.use(pinoHttp);

  app.get('/contacts', getAllContacts);
  app.get('/contacts/:contactId', getContactById);

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = setupServer;
