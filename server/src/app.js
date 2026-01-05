const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

// Error handling middlewares (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;