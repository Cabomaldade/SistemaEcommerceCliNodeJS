
const mongoose = require('mongoose');

var clienteSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    codigo: {
        type: Number
    },
    nome: {
        type: String,
        required: 'Campo Obrigatório!'
    },
    cargo: {
        type: String,
        required: 'Campo Obrigatório!'
    },
    endereco: {
        type: String,
        required: 'Campo Obrigatório!'
    },
    cidade: {
        type: String,
        required: 'Campo Obrigatório!'
    },
    cep: {
        type: String,
        required: 'Campo Obrigatório!'
    },
    pais: {
        type: String,
        required: 'Campo Obrigatório!'
    },
    telefone: {
        type: String,
        required: 'Campo Obrigatório!'
    },
    fax: {
        type: String,
        required: 'Campo Obrigatório!'
    }
});

mongoose.model('Cliente', clienteSchema);