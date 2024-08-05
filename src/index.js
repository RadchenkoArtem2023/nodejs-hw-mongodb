require('dotenv').config();
const app = require('./server');
const connectDB = require('./db/initMongoConnection');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
