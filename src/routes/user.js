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

//Sempre exportar o módulo
module.exports = Router;