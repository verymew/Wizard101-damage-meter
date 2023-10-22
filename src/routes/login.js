const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const tryLogar = require('../controllers/loginController');


Router.get("/login", (req, res) =>{
    try{
     
    const errorMessage = req.flash('error')[0];   
    res.status(200).render("login",{error: errorMessage});
    }catch(error){
        res.status(500).json({
            erro: error
        })
    }
})

Router.post("/login", tryLogar.logar);

module.exports = Router;