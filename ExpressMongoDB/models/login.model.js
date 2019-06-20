const mongoose = require('mongoose');

var loginSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String,
        required: 'Campo Obrigatório!'
    },
    password: { 
        type: String,
        required: 'Campo Obrigatório!'
    }
});

/*
loginSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'O e-mail está inválido!');*/

mongoose.model('Login', loginSchema);
