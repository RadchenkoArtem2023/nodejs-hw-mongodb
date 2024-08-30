const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const contactsRouter = require('./routers/contacts');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');

const authRouter = require('./routers/auth');

const app = express();

const cookieParser = require('cookie-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cookieParser());

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/contacts', contactsRouter);
app.use('/auth', authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
