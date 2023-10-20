function isAutenticado(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.json({ mensagem: "Não autenticada" })
}

module.exports = isAutenticado;