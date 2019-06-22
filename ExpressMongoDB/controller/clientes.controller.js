const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

// Get all 
router.get('/', (req, res) => {
    console.log("Entrou no GET padrao!");
    Cliente.find()          // se passar o find sem objetos, traz todos no database  
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

// post funcionando normalmente, é cadastrado um usuário
router.post('/', (req, res) => {
    
    var idIncremento = 0;
    do {
        idIncremento = Math.floor(Math.random() * (10000 - 1000) + 1000);
        console.log("mais uma");
        console.log(gerarCodigo(idIncremento));
    } while (gerarCodigo(idIncremento));

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

// get está funcionando buscando por código
router.get('/:codigo', (req, res) => {
    const _codigo = req.params.codigo;
    Cliente.findOne({ codigo: _codigo })
        .exec()
        .then(doc => {
            console.log("Vindo do banco de dados ", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'Não há entradas para o código fornecido' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});

// update funcionando pelo código 
router.patch('/', (req, res) => { // update com mongoose
    /*const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value; $set: updateOps
    }*/
    var clienteAtualizado = req.body;
    var _codigo = req.body.codigo
    Cliente.update({codigo: _codigo},{$set: clienteAtualizado})
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

//Delete funcionando - deletando pelo código enviado do front 
router.delete('/:codigo', (req, res) => {
    const _codigo = req.params.codigo;
    Cliente.deleteOne({ codigo: _codigo })
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

// Função implementada, gerando códigos aleatórios entre 1000 e 10000 @Cabomaldade
function gerarCodigo(codigo) {
    var procuraCodigo = Cliente.find({ codigo: codigo }, 'codigo');
    if (procuraCodigo == codigo) {
        return true;
    }
    return false;
}
module.exports = router;