/**
 * 
 * ////Módulos
 */
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const sequelize = require('sequelize');
//sessoes
const session = require('express-session')
const flash = require('connect-flash');
//rotas
const loginRoute = require("./routes/loginPage");
const cadastroRoute = require("./routes/cadastro");
const app = express();
const passport = require('passport')
require("./config/auth")(passport); //Importando função de autenticação

/**
 * Sessões
 */
    app.use(session({
        secret: 'verymewgato',
        resave: true,
        saveUninitialized: true
    }))
    //Inicializando o passport.
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    
    //Usando o flash <
    app.use((req, res,next) =>{
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        next();
    })

/**
 * 
 * Body Parser: Não é mais usado. É so usar o proprio express.
 */
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

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

/**
 * Rotas
 */
app.use("/", cadastroRoute);
app.use("/", loginRoute);

/**
 * Ligando servidor
 */
const PORT = 3000
app.listen(PORT, (err, res) => {
    console.log("Funcionando na porta " + PORT)
})