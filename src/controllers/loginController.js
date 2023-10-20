/*
    Controller para a rota: Login
*/
const passport = require('passport');
/*Schemas*/


exports.logar = (req, res, next) =>{
    passport.authenticate("local", {
        successRedirect: "/user",
        failureRedirect: "/cadastro",
        failureFlash: true
    })(req,res,next)
}
