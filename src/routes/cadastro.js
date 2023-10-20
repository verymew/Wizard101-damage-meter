/**
 * 
 * //Rotas para o cadastro (até a rota de conclusão)
 * 
 *
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//importando serviços
require("../errors/StatusError");
//Controllers
const registrationController = require("../controllers/registrationController");


//pagina cadastro principal
router.get("/cadastro", (_req,res) =>{
    res.render("cadastro");
})

//Método post: cadastrar novo usuario
router.post('/cadastro/enviar', registrationController.criarUsuario);


//Exportando o modulo router
module.exports = router