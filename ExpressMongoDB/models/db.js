
const mongoose = require('mongoose');

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

require('./cliente.model'); // após criar o schema devo colocar aqui para que o banco use o modelo cliente exportado
require('./login.model');
require('./todo.model');
require('./enquete.model');