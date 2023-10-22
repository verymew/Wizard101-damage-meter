/**
 * Rota que da acesso a pagina do usuario, apos o login.
 */
const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Cadastro = require("../models/SchemaCadastro");
//services
const monstroFerramentas = require("../services/MonsterService");
//funções
const ensureAuth = require("../utils/authIsValid");
//controllers
const monsterController = require('../controllers/monsterRegistrationController');
const fichasDatasController = require('../controllers/userController');
const userController = require('../controllers/userController')

Router.get("/user", ensureAuth, userController.recuperarDadosGerais);

/*Rota para edição do inimigo*/
/*GET*/
Router.get("/user/monster", ensureAuth, monsterController.paginaMonstro);
/*Post*/
Router.post("/user/monster/register", ensureAuth, monsterController.registrarMonstro);

/*Rota Para recuperar dados com o front*/
Router.get("/user/userdata", ensureAuth, fichasDatasController.recuperarDadosGerais);

//Sempre exportar o módulo
module.exports = Router;