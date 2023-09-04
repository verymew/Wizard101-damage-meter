///////////////Módulos/////////
const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path')
const sequelize = require('sequelize')
const app = express();
//////////////////////////////

const PORT = 3000
////Engine:
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
///Configurando o partials, handlebars
// Registre o partial 'header'
const hbs = exphbs.create({
    partialsDir: 'views/partials',
  });
///Outro modo de registro.
//Handlebars.registerPartial('')
////Selecionando a pasta public para arquivos estaticos como CSS
app.use(express.static(path.join(__dirname, "public")))

//////////Rotas///////////////
app.get('/', (req, res) => {
    res.render("home");
})

app.get('/cad', (req, res) => {
    res.render("cadastro")
})

app.get('/sobre', (req,res) =>{
    res.send("real")
})
//////////////Ligando o servidor////////////////
app.listen(PORT, (err, res) => {
    console.log("Funcionando na porta " + PORT)
})