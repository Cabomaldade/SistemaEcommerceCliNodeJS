
const mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {
        type: Number
    },
    titulo: {
        type: String,
        required: 'Campo Obrigatório!'
    }
});

mongoose.model('Todo', todoSchema);