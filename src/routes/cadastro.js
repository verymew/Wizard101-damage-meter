/**
 * 
 * //Rotas para o cadastro (até a rota de conclusão)
 * 
 *
 */
const express = require('express');
const router = express.Router();

//pagina cadastro principal
router.get("/teste", (req,res) =>{
    res.json({
        nome: "Ju", 
        idade: "22"
    });
})

//Exportando o modulo router

module.exports = router