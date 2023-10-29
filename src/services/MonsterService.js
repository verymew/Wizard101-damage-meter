const monstroRegistro = require("../models/SchemaMonstro");
const mongoose = require('mongoose');
const StatusError = require("../errors/StatusError");
const isCampoNulo = require("../utils/nullFieldValidation");

class MonstroFerramentas{

    /*
        Método para buscar ficha (busca primeiro com role 1)
        Role 1 = ficha principal.
    */
    async fichaMonstro(userid){
        //Procura a ficha do monstro pelo ID e pela role 1
        const fichaDoMonstro = await monstroRegistro.findOne({criador: userid, role: 1}).lean();

        //Se não achar um com a role 1, procurar outro
        if(!fichaDoMonstro){
            //Mandar uma alternativa com a role 0
            const fichaDoMonstroWithoutRole = await monstroRegistro.findOne({
                criador: userid
            }).lean()
            .catch((error) =>{
                throw new StatusError("Não há nenhum registro.", 404)
            });

            //Se não encontrar nenhuma ficha, retorna null.
            if(!(fichaDoMonstroWithoutRole)){
                return null;
            }

            //Se tudo der certo, retorna a primeira ficha com role 1
            return fichaDoMonstroWithoutRole;
        };
        
        //Se tudo der certo, retorna a ficha em formato JSON.
        return fichaDoMonstro;
    };


    /*
        Metódo de registro de ficha de monstro.
    */
    async registrarMonstro(userid, damage, piercing, resist, incomingbo, name){
        //Verificar campos nulos
        if(
            !userid ||
            !damage ||
            !piercing ||
            !resist ||
            !incomingbo ||
            !name
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
        //role 1 para virar main
        const Registrar = new monstroRegistro({
            criador: userid,
            nome: name,
            damage: damage,
            piercing: piercing,
            resist: resist,
            incomingboost: incomingbo,
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
    };

    /*Deletar monstro*/
    async deletarM(idMonstro, idUser){
        const deletarmonstro = await monstroRegistro.deleteOne({_id: idMonstro, criador: idUser })
        .catch(error =>{
            throw new StatusError("Não foi deletado com sucesso.", 400);
        })
    };

    /*Procura um monstro por seu id*/
    async getUmMonstro(idMonstro){
        const fichaMonstro = await monstroRegistro.findOne({_id: idMonstro}).lean();
        if(!fichaMonstro){
            throw new StatusError("Nenhum monstro encontrado", 404)
        }
        return fichaMonstro;
    };

    /*dando update no monstro*/
    async updateMonstro(idUser, idMonstro, nome, damage, piercing, incomingbo, resist){
        
        //objetos moongose
        const idmonstro = new mongoose.Types.ObjectId(idMonstro);
        const iduser = new mongoose.Types.ObjectId(idUser);

        //dando update em apenas um arquivo
        await monstroRegistro.updateOne({ _id: idmonstro, criador: iduser}, {
            nome: nome,
            damage: damage,
            piercing: piercing,
            incomingbo: incomingbo,
            resist: resist
        }).catch(error => {
            throw new StatusError("Não foi possível atualizar o registro.", 400);
        });
    }
};

module.exports = MonstroFerramentas;
