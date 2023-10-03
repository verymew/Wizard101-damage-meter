/**
 * Rota que da acesso a pagina do usuario, apos o login.
 */
const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
//funções
const ensureAuth = require("../utils/authIsValid");

Router.get("/user", ensureAuth, (req, res) =>{
    const userInf = req.user;
    res.json({
        nome: userInf.name
    })

})

//Sempre exportar o módulo
module.exports = Router;