const isAuthenticated = (req, res, next) => {
  if (req.session.usuario) {
    next();
  } else {
    res.redirect('/login');
  }
};

const isAdmin = (req, res, next) => {
  if (req.session.usuario && req.session.usuario.rol === 2) {
    res.locals.isAdmin = true;
  } else {
    res.locals.isAdmin = false;
  }
  next();
};


const redirectIfAuthenticated = (req, res, next) => {
  if (req.session.usuario) {
    res.redirect('/users/perfil/');
  } else {
    next();
  }
};
const restrictToAdmin = (req, res, next) => {
  if (req.session.usuario && req.session.usuario.rol === 2) {
    next();
  } else {
    res.status(403).send('Acceso denegado. Esta función solo está disponible para administradores.');
  }
};
module.exports = { isAuthenticated, isAdmin, redirectIfAuthenticated ,restrictToAdmin };
