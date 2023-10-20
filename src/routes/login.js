const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


Router.get("/login", (req, res) =>{

    res.render("login");
})

Router.post("/login", (req, res, next) =>{
    passport.authenticate("local", {
        successRedirect: "/user",
        failureRedirect: "/cadastro",
        failureFlash: true
    })(req,res,next)
})

module.exports = Router;