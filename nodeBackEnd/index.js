const express = require('express');

const PORT = 3000;

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/", (req, res) => res.json({ status: "Nodejs backend" }));

app.get("/clientes", (req, res) => {
    res.json(
        [
            { 'codigo': 1, 'nome': 'unilever' },
            { 'codigo': 2, 'nome': 'bombril' },

        ]
    );
});

// criei esse array de usuários para testar o back, funcionando
var usuarios  = [
                { 'codigo': 1, 'email': 'test@test.com', 'password': '12345' },
                { 'codigo': 2, 'email': 'souto@sou.com', 'password': '12345' }]

app.post('/login', function (req, res) {
    var user_name = req.body.email;
    var password = req.body.password;
    console.log("Email = " + user_name + ", password is " + password);
    //res.end("yes");
    var temp = usuarios.find(usuarios => (usuarios.email == user_name) && (usuarios.password == password))
    if(temp){
        res.json(temp);
    }
    else{
        res.json("Usuario ou senha nao conferem");
    }   
 });

/*
const axios = require('axios')

axios.post('localhost:4200/todos', {
    todo: 'Comprar Leite'
})
    .then((res) => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
    })
    .catch((error) => {
        console.error(error)
    })

app.get("/login", (req, res) => {
    res.json(
        [
            { 'codigo': 1, 'email': 'test@test.com', 'password': '12345' },
            { 'codigo': 2, 'email': 'souto@sou.com', 'password': '12345' },

        ]
    );
});
*/

app.listen(PORT, () => console.log("escutando na porta " + PORT));
