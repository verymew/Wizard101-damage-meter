/*
 * Rotas para o cadastro 
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//importando serviços
require("../errors/StatusError");
//Controllers
const registrationController = require("../controllers/registrationController");


/*
    @GET
    Renderiza a pagina de cadastro
*/
router.get("/cadastro", (_req,res) =>{
    res.render("cadastro");
})

/*
    @POST
    cadastra o usuário no sistema.
*/
router.post("/cadastro/enviar", registrationController.criarUsuario);


//Exportando o modulo router
module.exports = router