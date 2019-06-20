const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');


router.get('/', (req, res) => {
    console.log("Entrou no GET padrao!");
    Cliente.find()          // If I dont pass an argument, it will find all the elements  
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

router.post('/', (req, res) => {
    console.log("chamou!");
    var idIncremento = 0;
    do{
        idIncremento = Math.floor(Math.random() * (10000 - 1000) + 1000);
        console.log("mais uma");
        console.log(gerarCodigo(idIncremento));
    }while(gerarCodigo(idIncremento));

    const cliente = new Cliente({
        _id: new mongoose.Types.ObjectId(), // aqui usa mongoose para criar um ID
        codigo: idIncremento,
        cargo: req.body.cargo,
        cep: req.body.cep,
        cidade: req.body.cidade,
        endereco: req.body.endereco,
        fax: req.body.fax,
        nome: req.body.nome,
        pais: req.body.pais,
        telefone: req.body.telefone
    });
    cliente
        .save()
        .then(result => { // aqui adiciona uma promisse
            console.log(result);
            res.status(201).json({
                message: 'usuario foi cadastrado com sucesso!',
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
});

router.patch('/:clienteID', (req, res) => { // update com mongoose
    const id = req.params.clienteID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Cliente.update({ _id: id }, { $set: updateOps })
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

router.delete('/:clienteID', (req, res) => {
    const id = req.params.clienteID;
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

function gerarCodigo(codigo) {
    var procuraCodigo = Cliente.find({codigo: codigo}, 'codigo');
    if(procuraCodigo == codigo){
            return true;
    }
    return false;
}
module.exports = router;