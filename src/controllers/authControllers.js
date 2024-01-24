// controllers/authController.js
const fs = require('fs').promises;
const path = require('path');

const usersFilePath = path.resolve(__dirname, '../data/users.json');

// Función para cargar usuarios de manera asíncrona
exports.cargarUsuariosAsync = async () => {
  try {
    const usuariosData = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(usuariosData);
  } catch (error) {
    throw error;
  }
};

exports.showLoginForm = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuarios = await exports.cargarUsuariosAsync();

    const usuarioAutenticado = usuarios.find(
      (usuario) => usuario.email === email && usuario.password === password
    );

    if (usuarioAutenticado) {
      req.session.usuario = {
        email: email,
        nombre: usuarioAutenticado.firstName,
        apellido: usuarioAutenticado.lastName,
      };
      res.redirect('/');
    } else {
      res.render('login', { error: true });
    }
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    res.redirect('/error');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
