const withLogin = (req, res, next) => {
    if(req.session.user === undefined){
        res.redirect('/'); //Redirige al usuario a la pagina de inicio de sesion
    }
  next();
};

const withoutLogin = (req, res, next) => {
    if(req.session.user){
        res.redirect('/'); //Redirige al usuario al perfil si ya esta autentificado
    }
  next();
};

const adminLogin = (req, res, next) => {
  next();
};


module.exports = {withLogin, withoutLogin, adminLogin};