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
const mongoose = require('mongoose'); // importing mongoose

mongoose.connect(
    'mongodb://localhost:27017/ClientesDB',
    { useNewUrlParser: true },
    (err) => {
        if (!err) {
            console.log('MongoDB está conectado!');
        } else {
            console.log('Ocorreu um erro com a conexao: ' + err);
        }
    }
);
/*mongoose.connect(
    "mongodb+srv://cabomaldade:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0-mpbti.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true } 
);
*/ //Esta conexão utilizei para acesso na nuvem AWS - mudei para MongoDB local

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