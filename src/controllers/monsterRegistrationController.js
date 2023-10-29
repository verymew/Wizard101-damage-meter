const mongoose = require('mongoose');
/*Schemas*/
const userBase = require("../models/SchemaCadastro");
const monstroFicha = require("../models/SchemaMonstro");
const MonstroFerramentas = require("../services/MonsterService");
const StatusError = require("../errors/StatusError");
//funções
const isNulo = require("../utils/nullFieldValidation");


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
};

/*
    Post
*/
exports.registrarMonstro = async (req, res) => {
    try{
        const { name, idcriador, damage, piercing, resist, incomingbo } = req.body;

        //Registrar monstro
        const registroMonstro = new MonstroFerramentas();
        const idUser = new mongoose.Types.ObjectId(req.user.id);
        await registroMonstro.registrarMonstro(idUser, damage, piercing, resist, incomingbo, name);
        
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
/*
    @DELETE
*/
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

/*
    @GET
*/
exports.paginaEditarMonstro = async(req, res) => {
    try{
    //Requisita os parametros do endereço
    const idMonstro = new mongoose.Types.ObjectId(req.params.id);

    const ferramentaM = new MonstroFerramentas();
    //procurar e retornar a ficha
    const fichaM = await ferramentaM.getUmMonstro(idMonstro);

    //Envia para a pagina
    res.status(200).render("editarmonstro", { fichaM })

    }catch(error){

        return res.status(400).render("editarmonstro");
    }
};
/*
    @PUT
*/
exports.putEditarMonstro = async(req, res) => {
    try{
        //recuperar dados do body;
        const { idmonstro, nome, damage, piercing, incomingbo, resist } = req.body;
        const arraycampos = [nome, damage, piercing, incomingbo, resist];

        //dar update no banco de dados
        const ferramentaM = new MonstroFerramentas();
        //verificar campos nulos
        if(isNulo(arraycampos)){
            throw new StatusError("Campos nulos.", 400)
        };

        //atualizar o monstro
        await ferramentaM.updateMonstro(req.user.id, idmonstro, nome, damage, piercing, incomingbo, resist);

        //redirecionar para a pagina de editar monstros
        res.status(200).redirect("/user");

    }catch(error){

        return res.status(error.codigoStatus || 500).render("editarmonstro", {error});
    }
};