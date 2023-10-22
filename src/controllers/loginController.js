/*
    Controller para a rota: Login
*/
const passport = require('passport');
/*Schemas*/

exports.logar = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        // Erro na autenticação
        return res.status(500).json({ error: "Erro interno de servidor" });
      }
  
      if (!user) {
        // Falha na autenticação
        return res.status(401).json({ error: "Falha na autenticação. Verifique seu nome de usuário e senha." });
      }
  
      // Autenticação bem-sucedida
      // Redirecione para a página de usuário ou realize outras ações
      res.status(200).json({ success: "Autenticação bem-sucedida" });
    })(req, res, next);
  };