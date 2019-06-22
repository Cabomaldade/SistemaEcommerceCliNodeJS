const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Enquete = mongoose.model('Enquete');

router.get('/teste', (req, res) => {
    res.json('Texto de GET do Enquete de teste');
    console.log(res.json({}));
});

// Get all 
router.get('/', (req, res) => {
    console.log("Entrou no GET padrao!");
    Enquete.find()          // se passar o find sem objetos, traz todos no database  
        .exec()
        .then(docs => {
            //console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            //console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Update está funcionando - atualiza os likes e dislikes da página
router.patch('/', (req, res) => { // update com mongoose
    var enqueteAtualizado = req.body;
    var _marca= req.body.marca
    Enquete.updateOne({marca: _marca},{$set: enqueteAtualizado})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

/*     // Deixar implementado, mas não usarei no momento, regra da aplicação
router.post('/', (req, res) => {
    const enquete = new Enquete({
        _id: new mongoose.Types.ObjectId(), // aqui usa mongoose para criar um ID
        marca: req.body.marca,
        like: req.body.like,
        dislike: req.body.dislike
    });
    enquete
        .save()
        .then(result => { // aqui adiciona uma promisse
            console.log(result);
            res.status(201).json({
                message: 'Celular foi cadastrado com sucesso!',
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
*/

module.exports = router;