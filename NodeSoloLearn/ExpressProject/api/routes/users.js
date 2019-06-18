// user.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    User.find()          // If I dont pass an argument, it will find all the elements  
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    /*res.status(200).json({ //usado no aprendizado
        message: 'Handling GET request of the /users'
    });*/
});

router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(), // aqui usa mongoose para criar um ID
        name: req.body.name,
        age: req.body.age,
        country: req.body.country,
        email: req.body.email
    });
    user
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

router.get('/:userID', (req, res, next) => {
    const id = req.params.userID;
    console.log(id);
    User.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid entry found for provided ID' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
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

router.patch('/:userID', (req, res, next) => { // update com mongoose
    const id = req.params.userID;
    const updateOps = {};
    for( const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id}, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    /*const id = req.params.userID;
    //find and update an user by id
    res.status(200).json({
        message: 'User updated!'
    });*/
});

//Com patch(update), deve vir valores com as devidas propriedades como no exemplo abaixo
//[
//	{"propName" : "name", "value": "cabomaldade2"}
//]

router.delete('/:userID', (req, res, next) => {
    const id = req.params.userID;
    User.remove({ _id: id })
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
    /*const id = req.params.userID;
    //find and delete an use by id
    res.status(200).json({
        message: 'User deleted!'
    });*/
});



module.exports = router;