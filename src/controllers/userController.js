const mongoose = require('mongoose');
/*Schemas*/
const userBase = require("../models/SchemaCadastro");
const monstroRegistro = require("../models/SchemaMonstro");
const monstroFerramentas = require("../services/MonsterService");
const userFerramentas = require("../services/UserService");

exports.recuperarDadosGerais = async (req, res) => {
    try{
        //Pesquisar dados do monstro principal (role: [1])
        const monstro = new monstroFerramentas(); 
        const idMonstro = new mongoose.Types.ObjectId(req.user.id);
        const fichaMonster = await monstro.fichaMonstro(idMonstro);

        //Pesquisar dados do usuario
        const usuario = new userFerramentas();
        const fichaUser = await usuario.getUser(req.user.id);

        res.render("usuario", { fichaUser, fichaMonster } );
    }catch(error){

        return res.status(error.codigoStatus || 500).json({
            erro: error.message
        });
    }
};