/*
    Controller de registro de usuario
*/
/*Services*/
const RegistrationService = require('../services/RegistrationService');
/*Middleware*/
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
/*Schema*/
const Cadastro = require('../models/SchemaCadastro');


exports.criarUsuario = async (req, res) => {
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
        return res.status(error.codigoStatus || 500).render("cadastro", {error: error.message})
    }
}
