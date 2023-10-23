const mongoose = require('mongoose');
const schemaUser = require("../models/SchemaCadastro");
const StatusError = require("../errors/StatusError");

class UserService{
    //Métodos

    /*Retornar a ficha do usuario*/
    async getUser(userid){
        const userdata = await schemaUser.findById(userid).lean();
        if(!userdata){
            throw new StatusError("Usuário não encontrado.", 404)
        };

        return userdata;
    }
}

module.exports = UserService;