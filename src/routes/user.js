/**
 * Rota que da acesso a pagina do usuario, apos o login.
 */
const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Cadastro = require("../models/SchemaCadastro");
//funções
const ensureAuth = require("../utils/authIsValid");

//controllers
const monsterController = require('../controllers/monsterRegistrationController');

Router.get("/user", ensureAuth, async (req, res) =>{
    const userInf = req.user;
    
    //Procurando nome no banco de dados para achar ID
    const resistencia = await Cadastro.findOne({ name: userInf.name})
    //res.render("usuario", userInf)
    //res.json({
    //    Resistencia: resistencia.damage
    //})
    res.render("usuario", resistencia);
})

/*Rota para edição do inimigo*/
/*GET*/
Router.get("/user/monster", ensureAuth, monsterController.paginaMonstro);
/*Post*/
Router.post("/user/monster/register", ensureAuth, monsterController.registrarMonstro);

//Sempre exportar o módulo
module.exports = Router;