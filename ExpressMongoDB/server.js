require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');

const clientesController = require('./controller/clientes.controller');
const loginController = require('./controller/login.controller');
const todoController = require('./controller/todo.controller');
const enqueteController = require('./controller/enquete.controller');

var app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
        return res.status(200).json({});
    }
    return next();
})

app.listen(3000, () => {
    console.log('Servidor Express iniciado na porta: 3000');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/clientes', clientesController); // com este controlador acesso a nova rota criada para clientes
app.use('/login', loginController); // com este controlador acesso a nova rota criada para login
app.use('/todo', todoController); // com este controlador acesso a nova rota criada para todo
app.use('/enquete', enqueteController);  // com este controlador acesso a nova rota criada para enquete


// nodemon server.js reinicia o servidor cada vez que você salvar, ao invés de usar node server.js