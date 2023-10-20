function isAutenticado(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("https://http.cat/images/401.jpg");
}

module.exports = isAutenticado;