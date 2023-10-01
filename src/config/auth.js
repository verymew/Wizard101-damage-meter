const localStrategy = require("passport-local").Strategy
const Mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
//schema
const Usuario = require("../models/SchemaCadastro");


module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'nome', passwordField:'senha'}, (nome, senha, done) =>{
        //Procura o usuario no banco de dados.
        Usuario.findOne({name: nome}).then((usuario =>{
            if(!usuario){
                //Se o usuario não existir, envia uma mensagem de erro.
                return done(null, false, {mensagem: 'Essa conta não existe.'})
            }
            //Se existir, compara a senha.)
            bcrypt.compare(senha, usuario.password, (erro, bate) =>{
                //Se a senha bater, retorna um usuario.
                if(bate){
                    return done(null, usuario)
                } else {
                    return done(null, false, {mensagem: 'Senha incorreta.'})
                }
            })    

        }))
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, usuario) =>{
            done(err, usuario)
        })
    })
}