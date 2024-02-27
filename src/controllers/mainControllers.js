const mainService = require('../services/mainService');

const mainController = {
  home: async (req, res) => {
    try {
      const masVendidos = await mainService.getBestSellingProducts();
      const destacados = await mainService.getFeaturedProducts();

      const usuario = req.session.usuario;

      res.render("index", { masVendidos, destacados, usuario });
    } catch (error) {
      console.error('Error en la página principal:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  showLoginPage: (req, res) => {
    res.render('login', { pageTitle: 'Iniciar Sesión' });
  },

  showRegisterPage: (req, res) => {
    res.render('register', { pageTitle: 'Registro de Usuario' });
  },

};

module.exports = mainController;
