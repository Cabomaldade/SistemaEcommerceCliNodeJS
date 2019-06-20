const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Login = mongoose.model('Login');

router.get('/exemplo', (req, res) => {
    res.json('Texto de GET do login exemplo');
    console.log(res.json({}));
});

router.post('/obtendo-id', (req, res) => {
    Login.findOne({ email: req.body.email, password: req.body.password }, 'id')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'Não há usuários cadastrados com este e-mail e senha!' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});

router.post('/cadastro-login', (req, res) => {
    console.log("chamou!");
    const login = new Login({
        _id: new mongoose.Types.ObjectId(), // aqui usa mongoose para criar um ID
        email: req.body.email,
        password: req.body.password
    });
    login
        .save()
        .then(result => { // aqui adiciona uma promisse
            console.log(result);
            res.status(201).json({
                message: 'Handling POST request of the /users',
                user: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:loginID', (req, res) => {
    const id = req.params.loginID;
    Cliente.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});



module.exports = router;