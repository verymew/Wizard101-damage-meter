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

        //Verificando se existem campos nulos.
        const erros = await RegServ.eValido();
        //Verificando se existe o usuário.
        
        //Redirecionando para caso exista erros
        if(erros.length > 0){
            //Early return para pausar a requisição HTTP.
            return res.status(400).render("cadastro", {erros});
         }

        await RegServ.Registrar();

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
        res.status(error.codigoStatus || 500).render("cadastro", {erro: "Erro interno."})
    }
});




//Exportando o modulo router

module.exports = router