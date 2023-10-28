const Mongoose = require('mongoose');
const Usuario = require("../models/SchemaCadastro");
//funções
require("../utils/nullFieldValidation");
const StatusError = require("../errors/StatusError");

class RegistrationService{
    //construtor
    constructor(nome, senha, dano, piercing, critical, resist, email){
        this.nome = nome;
        this.senha = senha;
        this.dano = dano;
        this.piercing = piercing;
        this.critical = critical;
        this.resist = resist;
        this.email = email;
    }
    //Métodos
    //Vamos usar só um método para valida tudo
    //Função assíncrona, pois fará conexão com banco mongoDB
    async eValido() {
        if (
          !this.nome ||
          !this.senha ||
          !this.dano ||
          !this.piercing ||
          !this.critical ||
          !this.resist ||
          !this.email
        ) {
          throw new StatusError("Campo(s) nulo(s).", 400);
        }
    }

    async Registrar(){
        //verificar email
        const emailEncontrado = await Usuario.findOne({email: this.email })
        if(emailEncontrado){
          throw new StatusError("E-mail já existe.", 409)
        }
        //verificar nome
        const usuarioEncontrado = await Usuario.findOne({name: this.nome})
        if(usuarioEncontrado){
        throw new StatusError("Usuário já existe.", 409)
        }
    }
    
}

module.exports = RegistrationService