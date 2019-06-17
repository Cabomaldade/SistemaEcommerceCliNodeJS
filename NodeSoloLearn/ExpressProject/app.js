// app.js
const express = require('express');
const app = express();
const usersRoutes = require('./api/routes/users');

app.use('/users', usersRoutes);

/*
app.use((req, res, next) => {
    res.status(200).json({
        message: 'Hello World'
    });
});
*/

module.exports = app;