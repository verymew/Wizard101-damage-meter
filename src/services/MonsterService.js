const monstroRegistro = require("../models/SchemaMonstro");
const mongoose = require('mongoose');
const StatusError = require("../errors/StatusError");

class MonstroFerramentas{

    //Procura a ficha do monstro pelo ID e pela role 1
    //Retorna em JSON
    async fichaMonstro(userid){
        const fichaDoMonstro = await monstroRegistro.findOne({criador: userid, role: 1}).lean();
        if(!fichaDoMonstro){
            return null;
        }

        return fichaDoMonstro;
    }

    //Registro de ficha de monstro
    async registrarMonstro(userid, damage, piercing, resist, incomingbo){
        //Verificar campos nulos
        if(
            !userid ||
            !damage ||
            !piercing ||
            !resist ||
            !incomingbo 
        ){
            throw new StatusError("Campos nulos.", 400);
        }

        //Verificar se existe algum registro com role[1] (principal)
        const fichaDoMonstro = await monstroRegistro.find({criador: userid, role: 1});
        //Se existir, colocar para role 0.
        if(fichaDoMonstro.length > 0){
            await monstroRegistro.updateMany(
                //Critérios: Id do criador, role 1
                {criador: userid, role: 1}, 
                //Update
                { role: 0})
        };

        //Criando registro
        const Registrar = new monstroRegistro({
            criador: userid,
            incomingboost: incomingbo,
            damage: damage,
            piercing: piercing, 
            resist: resist,
            role: 1
        })
        //salvando no banco de dados
        Registrar.save();
    }

    //Método para enviar TODAS as fichas do usuário
    //recebe um new moongoose.Type.ObjectId
    async getTodosMonstros(userid){
        const fichasMonstros = await monstroRegistro.find({
            //filtros
            criador: userid
        }).lean();
        if(!fichasMonstros){
            throw new StatusError("Nenhum monstro encontrado.", 404);
        }
        
        return fichasMonstros;
    }

    /*Deletar monstro*/
    async deletarM(idMonstro){
        
        const deletarmonstro = await monstroRegistro.deleteOne({_id: idMonstro })
        .catch(error =>{
            throw new StatusError("Não foi deletado com sucesso.", 400);
        })
    }

}

module.exports = MonstroFerramentas;
