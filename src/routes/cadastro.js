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

require("../errors/StatusError");



//pagina cadastro principal
router.get("/cadastro", (_req,res) =>{
    res.render("cadastro");
})

//Método post: cadastrar novo usuario
router.post("/add", async (req, res) => {
    try{

        //Resgatando conteudo do formulario
        const { name, password, damage, piercing, critical, resist } = req.body

        //Checando se o usuario(nome) ja existe
        //Como estamos lidando com banco de dados, usar função assíncrona.
        const RegServ = new RegistrationService(name, password, damage, piercing, critical, resist);

        //Checar campos nulos
        const campoNulo = await RegServ.eValido();
        //Checar se existem usuarios iguais
        const userExiste = await RegServ.Registrar();

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
            res.status(200).json({ Mensagem: "Usuário cadastrado! "})
        })

    }catch(error){
        //O return é importante para impedir que o codigo continue executando apos o throw.
        return res.status(error.codigoStatus || 500).json({
            error: "Erro interno"
        })
    }
});




//Exportando o modulo router

module.exports = router