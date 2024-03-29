const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { Usuario } = require('../database/models');

const authController = {
  showLoginForm: (req, res) => {
    if (req.session.usuario) {
      res.redirect('/users/perfil');
    } else {
      // Si el usuario no está autenticado, mostrar el formulario de inicio de sesión
      res.render('login');
    }
  },

  login: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('login', { errors: errors.array(), error: true });
    }

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
          rol: usuarioAutenticado.rol_id 
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
    if (req.session.usuario) {
      req.session.destroy(); // Elimina la sesión del usuario
    }
    res.redirect('/'); // Redirige al inicio después de cerrar sesión
  },
};

module.exports = authController;
