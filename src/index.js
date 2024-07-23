require('dotenv').config();
const setupServer = require('./server');
const initMongoConnection = require('./db/initMongoConnection');

const startServer = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
