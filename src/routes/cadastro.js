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
router.post("/add", (req, res) => {
    const novoUsuario = req.body
    res.json(novoUsuario);
})

//Exportando o modulo router

module.exports = router