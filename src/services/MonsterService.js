const monstroRegistro = require("../models/SchemaMonstro");
const mongoose = require('mongoose');

class MonstroFerramentas{
    //Métodos
    async procurarId(userInf){
        const usuarioId = await userBase.findOne({name: userInf})
        .then((usuario) => {
            return usuario.id
        })
    }
}

module.exports = MonstroFerramentas;
