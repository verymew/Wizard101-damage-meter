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

/*#Rota para edição do inimigo*/
/*GET*/
Router.get("/user/monster", ensureAuth, monsterController.paginaMonstro);
/*Post*/
Router.post("/user/monster/register", ensureAuth, monsterController.registrarMonstro);

/*Rota de remoção de monstro*/
Router.delete("/user/:id", ensureAuth, monsterController.deletarMonstro);

/*Rota para editar monstro*/

/*Rota para escolher monstro como principal*/

//Sempre exportar o módulo

/* /Rota para edição do inimigo*/

/*Rota Para recuperar dados com o front*/
Router.get("/user/userdata", ensureAuth, fichasDatasController.recuperarDadosGerais);

/*Rota para mostrar todos os monstros do usuario*/
Router.get("/user/monster/list", ensureAuth, userController.listarTodosMonstros);


module.exports = Router;