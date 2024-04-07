const { validationResult } = require('express-validator');
const userService = require('../services/userService');

const userController = {
  mostrarPerfil: async (req, res) => {
    try {
      const usuarioAutenticado = req.session.usuario;

      if (usuarioAutenticado) {
        const usuarioEncontrado = await userService.getUsuarioByEmail(usuarioAutenticado.email);

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

  store: async (req, res) => {
    try {
      const userData = req.body;
      userData.image = req.file ? req.file.filename : null;

      await userService.createUser(userData);

      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  editar: async (req, res) => {
    try {
      const usuario = await userService.getUsuarioById(req.params.id);
      res.render('userEdit', { usuario });
    } catch (error) {
      console.error('Error al cargar usuario para editar:', error);
      res.redirect('/error');
    }
  },

  update: async (req, res) => {
    try {
      const userData = req.body;
      userData.image = req.file ? req.file.filename : req.body.currentImage;

      await userService.updateUser(req.params.id, userData);

      res.redirect(`/users/perfil`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  Detalle: async (req, res) => {
    try {
      const usuario = await userService.getUsuarioById(req.params.id);
      res.render('userProfile', { user: usuario });
    } catch (error) {
      console.error('Error al cargar usuario para ver detalle:', error);
      res.redirect('/error');
    }
  },
};

module.exports = userController;
