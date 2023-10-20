const mongoose = require('mongoose');
/*Schemas*/
const userBase = require("../models/SchemaCadastro");
const monstroRegistro = require("../models/SchemaMonstro");
const MonstroFerramentas = require("../services/MonsterService");

/*
    Get
*/
exports.paginaMonstro = async(req, res) =>{
    /*Service para procurar ID*/
    try{
        //Procurando o ID para usar no registro de monstro
        const userInf = await req.user.id;
        //Enviando o id para o Html.
        res.status(200).render("monstro", {userInf});
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

        const Registrar = new monstroRegistro({
            criador: idcriador,
            incomingboost: incomingbo,
            damage: damage,
            piercing: piercing, 
            resist: resist
        })

        Registrar.save()
    }catch(erro){

    }

    /*
        Conferir criador e campos nulos
    */

};