const fs = require('fs').promises;
const path = require('path');
const bcrypt = require("bcryptjs");

const usersFilePath = path.resolve(__dirname, '../data/users.json');

const cargarUsuariosAsync = async () => {
  try {
    const usuariosData = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(usuariosData);
  } catch (error) {
    throw error;
  }
};

const controller = {
  mostrarPerfil: async (req, res) => {
    try {
      const usuarios = await cargarUsuariosAsync();
      const usuarioAutenticado = req.session.usuario;

      if (usuarioAutenticado) {
        const usuarioEncontrado = usuarios.find(user => user.email === usuarioAutenticado.email);

        if (usuarioEncontrado) {
          res.render('userProfile', { user: usuarioEncontrado });
        } else {
          res.redirect('/login');
        }
      } else {
        res.redirect('/login');
      }
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
      const usuarios = await cargarUsuariosAsync();
      const newUser = {
        id: usuarios.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
      };

      usuarios.push(newUser);

      await fs.writeFile(usersFilePath, JSON.stringify(usuarios, null, 2));

      res.redirect("/users/perfil");
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  }
};

module.exports = controller;
