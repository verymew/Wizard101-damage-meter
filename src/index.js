/**
 * 
 * ////Módulos
 * 
 */
const express = require('express');
const exphbs = require('express-handlebars')
const mongoose = require('mongoose');
const path = require('path')
const sequelize = require('sequelize')
var bodyParser = require('body-parser');
const cadastroRoute = require("./routes/cadastro");
const app = express();

/**
 * 
 * Body Parser
 * 
 */
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
/**
 * //Handlebar
 */
    app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');
///Configurando o partials, handlebars
    const hbs = exphbs.create({
        partialsDir: 'views/partials',
    });
////Selecionando a pasta public para arquivos estaticos como CSS
    app.use(express.static(path.join(__dirname, "public")))

/**
 * Mongoose
 */
async function connect(){
    try{
        mongoose.connect("mongodb+srv://verymew:KEsxzf6d17cruG58@cluster0.kdxxrun.mongodb.net/?retryWrites=true&w=majority");
        console.log("Conectado!");
    } catch(err){
        console.log(err);
    }
}
connect();
//////////Rotas///////////////
    app.use("/novo", cadastroRoute);
/**
 * 
 * //Ligando o servidor/////
 * /////////////////////////
 */
const PORT = 3000
app.listen(PORT, (err, res) => {
    console.log("Funcionando na porta " + PORT)
})