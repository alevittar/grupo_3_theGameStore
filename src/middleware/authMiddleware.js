const isAuthenticated = (req, res, next) => {
  if (req.session.usuario) {
    next();
  } else {
    res.redirect('/login');
  }
};

const isAdmin = (req, res, next) => {
  if (req.session.usuario && req.session.usuario.role === 'admin') {
    next();
  } else {
    res.status(403).send('No tienes permiso para acceder a esta página');
  }
};

module.exports = { isAuthenticated, isAdmin };
