/*
    Controller para a rota: Login
*/
const passport = require('passport');
/*Schemas*/

exports.logar = (req, res, next) =>{
    passport.authenticate("local", {
        successRedirect: "/user",
        failureRedirect: "/login",
        failureFlash: 'Nome ou senha inválidos'
    })(req,res,next)
}