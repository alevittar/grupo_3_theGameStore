const bcrypt = require('bcrypt');
const { Usuario } = require('../database/models'); 

const authController = {
  showLoginForm: (req, res) => {
    res.render('login');
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const usuarioAutenticado = await Usuario.findOne({
        where: { email: email }
      });

      if (usuarioAutenticado && bcrypt.compareSync(password, usuarioAutenticado.password)) {
        req.session.usuario = {
          email: email,
          nombre: usuarioAutenticado.first_name,
          apellido: usuarioAutenticado.last_name,
        };
        res.redirect('/');
      } else {
        res.render('login', { error: true });
      }
    } catch (error) {
      console.error('Error al autenticar usuario:', error);
      res.redirect('/error');
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  },
};

module.exports = authController;
