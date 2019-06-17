// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        return res.status(200).json({});
    }
    return next();
})
const usersRoutes = require('./api/routes/users');
const codesRoutes = require('./api/routes/codes');
const mongoose = require('mongoose'); // Tipo um middleware entre o NodeJs e o MongoDB
mongoose.connect('mongodb://127.0.01:27017/sistema_ecommerce_cli', (err) => {
    if (err) throw err;
    console.log('Successfully connected to .');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/users', usersRoutes);
app.use('/codes', codesRoutes);

/*
app.use((req, res, next) => {
    res.status(200).json({
        message: 'Hello World'
    });
});
*/

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

module.exports = app;