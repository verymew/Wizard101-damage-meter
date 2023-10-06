const Mongoose = require('mongoose');
const Usuario = require("../models/SchemaCadastro");
//funções
require("../utils/nullFieldValidation");
const StatusError = require("../errors/StatusError");

class RegistrationService{
    //construtor
    constructor(nome, senha, dano, piercing, critical, resist){
        this.nome = nome;
        this.senha = senha;
        this.dano = dano;
        this.piercing = piercing;
        this.critical = critical;
        this.resist = resist;
    }
    //Atributos
    
    //Métodos
    //Vamos usar só um método para valida tudo
    //Função assíncrona, pois fará conexão com banco mongoDB
    async eValido(){
        const erros = [];
        //Ver se o campo esta nulo
        if(this.nome == null || !(this.nome) || this.nome == undefined){
            erros.push({mensagem: "Nome nulo"})
        }
        if(this.senha == null || !(this.senha) || this.senha == undefined){
            erros.push({mensagem: "Senha nula."})
        }
        if(this.dano == null || !(this.dano) || this.dano == undefined){
            erros.push({mensagem: "Dano nulo."})
        }
        if(this.piercing  == null || !(this.piercing) || this.piercing  == undefined){
            erros.push({mensagem: "Piercing nulo."})
        }
        if(this.critical == null || !(this.critical) || this.critical == undefined){
            erros.push({mensagem: "Critical nulo."})
        }
        if(this.resist == null || !(this.resist) || this.resist == undefined){
            erros.push({mensagem: "Resist nulo."})
        }

        return erros;
    }

    async Registrar(){
        const usuarioEncontrado = await Usuario.findOne({name: this.nome})
        if(usuarioEncontrado){
        throw new StatusError("Usuário já existe.", 409)
        }
    }
}

module.exports = RegistrationService