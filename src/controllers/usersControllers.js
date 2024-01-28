const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const usersFilePath = path.resolve(__dirname, '../data/users.json');
const profilesDir = path.resolve(__dirname, '../../public/img/profiles');

const cargarUsuariosAsync = async () => {
  try {
    const usuariosData = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(usuariosData);
  } catch (error) {
    throw error;
  }
};

const storage = multer.diskStorage({
  destination: profilesDir,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Límite de 5 MB para la imagen
}).single('image');

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
      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json(err);
        } else if (err) {
          return res.status(500).json(err);
        }

        const usuarios = await cargarUsuariosAsync();

        if (!req.body.password) {
          return res.status(400).send('La contraseña es requerida');
        }

        const fileName = req.file ? req.file.filename : null;

        const newUser = {
          id: usuarios.length + 1,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 12),
          category: req.body.category,
          image: fileName, // Almacenar el nombre del archivo en el JSON
        };

        usuarios.push(newUser);

        await fs.writeFile(usersFilePath, JSON.stringify(usuarios, null, 2));

        res.redirect('/');
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },
};

module.exports = controller;
