const User = require('../models/Usuario');
const bcrypt = require('bcrypt');

const register = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10, function(erro, hashedPass){
        if(erro){
            res.json({
                erro: err
            });
        };
    });
    
    let user = new User({
        name: req.body.name,
        password: req.body.hashedPass,
        damage: req.body.damage,
        piercing: req.body.piercing,
        critical: req.body.critical
    });

    user.save()
    .then(user => {
        res.json({
            mensagem: "REGISTRADO!!!"
        })
    })
    .catch(erro => {
        res.json({
            mensagem: erro
        })
    })
};