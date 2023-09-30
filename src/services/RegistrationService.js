const Mongoose = require('mongoose');
const Usuario = require("../models/SchemaCadastro");

class RegistrationService{
    //construtor
    constructor(nome){
        this.nome = nome;
    }
    //Métodos
    //Vamos usar só um método para valida tudo
    //Função assíncrona, pois fará conexão com banco mongoDB
    async eValido(){
        const erros = []

        //Ver se o campo esta nulo

        //Ver se o nome já existe no banco de dados
        const usuarioEncontrado = await Usuario.findOne({name: this.nome})
        if(usuarioEncontrado){
            erros.push({mensagem: "Usuario já existe."})
        }

        return erros;
    }
}

module.exports = RegistrationService