const express = require("express");
const Router = express.Router();
const user = require("../models/Usuario");

//ROTAS
Router.get("/login", (req, res) => {
    res.json({
        name: "juuuuu"
    })
})

module.exports = Router