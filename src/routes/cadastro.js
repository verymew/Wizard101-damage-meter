/**
 * 
 * //Rotas para o cadastro (até a rota de conclusão)
 * 
 *
 */
const express = require('express');
const router = express.Router();

//pagina cadastro principal
router.get("/cadastro", (req, res) => {
    res.send("cadastro");
})

//Exportando o modulo router
module.exports = router