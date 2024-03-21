  const withLogin = (req, res, next) => {
      if(req.session.user === undefined){
          res.redirect('/'); //Redirige al usuario a la pagina de inicio de sesion
          return;
      }
    next();
  };

  const withoutLogin = (req, res, next) => {
      if(req.session.user){
          res.redirect('/'); //Redirige al usuario al perfil si ya esta autentificado
          return;
      }
    next();
  };

  const adminLogin = (req, res, next) => {
    if (!req.session.user || !req.session.user.isAdmin) {
      res.redirect('/'); // Redirige al usuario si no es un administrador
      return;
    }
    next();
  };


  module.exports = {withLogin, withoutLogin, adminLogin};