const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');

router.get('/teste', (req, res) => {
    res.json('Texto de GET do Todo de teste');
    console.log(res.json({}));
});

router.post('/', (req, res) => {
    const todo = new Todo({
        _id: new mongoose.Types.ObjectId(), // aqui usa mongoose para criar um ID
        id: req.body.id,
        titulo: req.body.titulo
    });
    todo
        .save()
        .then(result => { // aqui adiciona uma promisse
            console.log(result);
            res.status(201).json({
                message: 'Todo foi cadastrado com sucesso!',
                todo: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:id', (req, res) => {
    const _id = req.params.id;
    Todo.deleteOne({ id: _id })
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