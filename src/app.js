const express = require('express');
const usersRoutes = require('./routes/users.routes');

const app = express();
app.use(express.json());
app.use('/users', usersRoutes);

module.exports = app;
