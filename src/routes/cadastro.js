/**
 * 
 * //Rotas para o cadastro (até a rota de conclusão)
 * 
 *
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("../models/Usuario");
const userModel = mongoose.model("usuario") //Precisa ser o exato nome da STRING

// 

//pagina cadastro principal
router.get("/novo", (req,res) =>{
    res.render("cadastro");
})

//Método post: cadastrar novo usuario
router.post("novo/add", (req, res) => {
    const novoUsuario = {
        name: req.body.name, //req.body.(nomeDoCampoNoHtml);
        password: req.body.password,
        damage: req.body.damage,
        piercing: req.body.piercing,
        critical: req.body.critical,
        resist: req.body.resist
    }
    new userModel(novoUsuario).save().then(() =>{
        console.log("Feito! ");
    }).catch( (err) => {
        console.log("ERRO AO SALVAR " + err);
    })
})

//Exportando o modulo router

module.exports = router