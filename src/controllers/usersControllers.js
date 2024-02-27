const bcrypt = require('bcrypt');
const path = require('path');
const { Usuario } = require('../database/models');

const userController = {
  mostrarPerfil: async (req, res) => {
    try {
      const usuarioAutenticado = req.session.usuario;

      if (usuarioAutenticado) {
        const usuarioEncontrado = await Usuario.findOne({ where: { email: usuarioAutenticado.email } });

        if (usuarioEncontrado) {
          return res.render('userProfile', { user: usuarioEncontrado });
        }
      }

      res.redirect('/login');
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      res.redirect('/error');
    }
  },

  create: (req, res) => {
    res.render('userForm');
  },

  store: async (req, res) => {
    try {
      const { firstName, lastName, email, password, category } = req.body;
      const fileName = req.file ? req.file.filename : null;

      await Usuario.create({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: bcrypt.hashSync(password, 12),
        category: category,
        image: fileName,
      });

      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  editar: async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      res.render('userEdit', { usuario: usuario });
    } catch (error) {
      console.error('Error al cargar usuario para editar:', error);
      res.redirect('/error');
    }
  },

  update: async (req, res) => {
    try {
      const { firstName, lastName, email, password, category } = req.body;
      const fileName = req.file ? req.file.filename : null;

      await Usuario.update({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: bcrypt.hashSync(password, 12),
        category: category,
        image: fileName,
      }, {
        where: { id: req.params.id },
      });

      res.redirect(`/users/${req.params.id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  Detalle: async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      res.render('userProfile', { user: usuario });
    } catch (error) {
      console.error('Error al cargar usuario para ver detalle:', error);
      res.redirect('/error');
    }
  },
};

module.exports = userController;
