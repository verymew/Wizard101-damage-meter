const Mongoose = require('mongoose');
const Usuario = require("../models/SchemaCadastro");

class RegistrationService{
    //métodos

    //Checar se o usuario ja existe, pois é ele um "id"
    async checkUserExist(nome){
        //Array de erros para retornar com mensagens no handlebars
        const erros = [];
        const userEncontrado = await Usuario.findOne({name: nome});
        if(userEncontrado.name == nome){
            erros.push({texto: 'O nome de usuário já existe.'})
        }
        return erros;
    }
}

module.exports = RegistrationService