/*
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


/*
    @GET
    Retorna a ficha do usário e a ficha do monstro do usuário.
 */
Router.get("/user", ensureAuth, userController.recuperarDadosGerais);

/*
    @GET
    Retorna a página de monstros do usuário.
*/
Router.get("/user/monster", ensureAuth, monsterController.paginaMonstro);
/*
*  @POST
   Registra o monstro no banco de dados.
 */
Router.post("/user/monster/register", ensureAuth, monsterController.registrarMonstro);

/*
    @DELETE
    Deleta um monstro
*/
Router.delete("/user/:id", ensureAuth, monsterController.deletarMonstro);

/*
    @GET
    Edita um monstro
*/
Router.get("/user/edit/:id", ensureAuth, monsterController.paginaEditarMonstro);

/*
    @PUT
    escolhe um monstro como monstro principal
*/

/*
    @GET
    
*/
Router.get("/user/userdata", ensureAuth, fichasDatasController.recuperarDadosGerais);

/*
    @GET
*/
Router.get("/user/monster/list", ensureAuth, userController.listarTodosMonstros);


module.exports = Router;