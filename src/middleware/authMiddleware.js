const isAuthenticated = (req, res, next) => {
  if (req.session.usuario) {
    next();
  } else {
    res.redirect('/login');
  }
};

const isAdmin = (req, res, next) => {
  if (req.session.usuario && req.session.usuario.rol === 2) {
    next();
  } else {
    res.status(403).send('No tienes permiso para acceder a esta página');
  }
};

const redirectIfAuthenticated = (req, res, next) => {
  if (req.session.usuario) {
    res.redirect('/users/perfil/');
  } else {
    next();
  }
};

module.exports = { isAuthenticated, isAdmin, redirectIfAuthenticated };
