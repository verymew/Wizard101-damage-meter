const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const tryLogar = require('../controllers/loginController');


Router.get("/login", (req, res) =>{

    res.render("login");
})

Router.post("/login", tryLogar.logar);

module.exports = Router;