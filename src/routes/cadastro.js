/**
 * 
 * //Rotas para o cadastro (até a rota de conclusão)
 * 
 *
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//Importando schema com criptografia
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//importando schema de Usuario.
const Cadastro = require("../models/SchemaCadastro");
const RegistrationService = require('../services/RegistrationService');
//importando serviços
require("../services/RegistrationService"); //Registration service.



//pagina cadastro principal
router.get("/cadastro", (req,res) =>{
    res.render("cadastro");
})

//Método post: cadastrar novo usuario
router.post("/add", async (req, res) => {
    //Resgatando conteudo do formulario
    const { name, password, damage, piercing, critical, resist } = req.body

    //Checando se o usuario(nome) ja existe
    //Como estamos lidando com banco de dados, usar função assíncrona.
    const erros = await new RegistrationService(name, password, damage, piercing, critical, resist).eValido();

    //Redirecionando para caso exista erros
    if(erros.length > 0){
        //Early return para pausar a requisição HTTP.
        return res.render("cadastro", {erros});
    } 

    //else
    //Criptografando a senha:
    const salt = await bcrypt.genSalt(); //await vai fazer o programa resolver
    const passHashed = await bcrypt.hash(password, salt)

    //Passando dados para o schema
    const newUser = new Cadastro({
        name: req.body.name,
        password: passHashed,
        damage: req.body.damage,
        piercing: req.body.piercing,
        critical: req.body.critical
    })

    //Registrando o schema no banco de dados
    newUser.save()
    .then((newUser) => {
        res.json({
            mensagem: "Registrada com sucesso!"
        })
    })
    .catch((erro) => {
        res.json({
            mensagem: erro
        })
    })
});




//Exportando o modulo router

module.exports = router