/**
 * 
 * //Rotas para o cadastro (até a rota de conclusão)
 * 
 *
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//Importando schema com criptografia
const criptoLogin = require("../controllers/criptoLogin");
const User = require("../models/Usuario")


//pagina cadastro principal
router.get("/novo", (req,res) =>{
    res.render("cadastro");
})

//Método post: cadastrar novo usuario
router.post("/add", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        password: req.body.password,
        damage: req.body.damage,
        piercing: req.body.piercing,
        critical: req.body.critical
    })
    newUser.save().then((newUser => 
        res.json({
            mensagem: "Registrada com sucesso"
        })
    )).catch((erro) => {
        res.json({
            mensagem: "FALHOU BEM FALHA"
        })
    })
});


//Exportando o modulo router

module.exports = router