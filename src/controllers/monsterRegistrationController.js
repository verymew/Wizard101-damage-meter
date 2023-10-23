const mongoose = require('mongoose');
/*Schemas*/
const userBase = require("../models/SchemaCadastro");
const monstroFicha = require("../models/SchemaMonstro");
const MonstroFerramentas = require("../services/MonsterService");
const StatusError = require("../errors/StatusError");


/*
    Get
*/
exports.paginaMonstro = async(req, res) =>{
    /*Service para procurar ID*/
    try{
        //Procurando o ID para usar no registro de monstro
        const userInf = req.user.id;
        


        //Enviando o id para o Html.
        res.status(200).render("monstro", { userInf });
    }catch(error){
        res.json({
            erro: error
        })
    }
}

/*
    Post
*/
exports.registrarMonstro = async (req, res) => {
    try{
        const { idcriador, damage, piercing, resist, incomingbo } = req.body;

        //Registrar monstro
        const registroMonstro = new MonstroFerramentas();
        const idUser = new mongoose.Types.ObjectId(req.user.id);
        await registroMonstro.registrarMonstro(idUser, damage, piercing, resist, incomingbo);
        
        res.status(200).redirect("/user");

    }catch(error){

        //return nos erros para pausar o codigo
        return res.status(error.codigoStatus || 500).json({
            erro: error.message
        }) 
    }

    /*
        Conferir criador e campos nulos
    */

};

exports.deletarMonstro = async(req, res) => {
    try{

        const idUser = new mongoose.Types.ObjectId(req.user.id);
        const idMonstro = new mongoose.Types.ObjectId(req.params.id);

        const ferramentaM = new MonstroFerramentas();
        //Deletar
        await ferramentaM.deletarM(idMonstro, idUser);

        //Sucesso
        res.status(200).json({mensagem: "DELETADO!"})

    }catch(error){

        return res.status(error.codigoStatus || 500).json({
            erro: error.message
        }) 

    }
};