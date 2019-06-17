// user.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request of the /users'
    });
});

router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(), // aqui usa mongoose para criar um ID
        name: req.body.name,
        age: req.body.age
    });
    user.save().then(result => { // aqui adiciona uma promisse
        console.log(result);
    })
        .catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST request of the /users',
        user: user
    });
});

router.get('/:userID', (req, res, next) => {
    const id = req.params.userID;
    console.log(id);
    User.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err})
    });

    /* Usuado no aprendizado
    const id = req.params.userID;

    if (id === 'admin') {
        res.status(200).json({
            message: 'You are the Admin!',
            ID: id
        });
    } else {
        res.status(200).json({
            message: 'You are a standard user',
            ID: id
        });
    }
    */
});

router.patch('/:userID', (req, res, next) => {
    const id = req.params.userID;
    //find and update an user by id
    res.status(200).json({
        message: 'User updated!'
    });
});

router.delete('/:userID', (req, res, next) => {
    const id = req.params.userID;
    //find and delete an use by id
    res.status(200).json({
        message: 'User deleted!'
    });
});



module.exports = router;