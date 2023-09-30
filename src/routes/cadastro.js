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
require("../services/RegistrationService");

router.get("/teste/novo", (req, res) => {
    Usuario.findOne({ name: "ju" })
    .then((info) => {
        res.json(info.toJSON());
    }).catch((err) =>{
        res.status(500).json({ ERRO: "NAO DEU CERTO "})
    })
})

router.get("/user/:id", (req, res) => {
    const link = req.params
    const userProcurar = Usuario.findOne({name: link})
    .then((usuario) => {
        res.json(usuario.toJSON())
    })
    .catch((erro) => {
        res.json({
            mensagem: "ERRO!!!!!!!!!!!!!!!!!!!!!!<"
        })
    })
})


//pagina cadastro principal
router.get("/cadastro", (req,res) =>{
    res.render("cadastro");
})

//Método post: cadastrar novo usuario
router.post("/add", async (req, res) => {
    //Resgatando conteudo do formulario
    const { name, password, damage, piercing, critical } = req.body

    //Checando se o usuario(nome) ja existe
    //Como estamos lidando com banco de dados, usar função assíncrona.
    const erros = await RegistrationService(name);
    //Redirecionando para caso exista erros
    if(erros.lenght > 0){
        //Early return para pausar a requisição HTTP.
        return res.render("/registro", {erro: erros});
    } 

    //else
    //Criptografando a senha:
    const salt = await bcrypt.genSalt(); //await vai fazer o programa resolver
    const passHashed = await bcrypt.hash(password, salt)

    //Passando dados para o schema
    const newUser = new User({
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