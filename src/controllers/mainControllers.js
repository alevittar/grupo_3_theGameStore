const mainService = require('../services/mainService');

const mainController = {
  home: async (req, res) => {
    try {
      const masVendidos = await mainService.getBestSellingProducts();
      const destacados = await mainService.getFeaturedProducts();

      // Obtener información del usuario si está autenticado
      const usuario = req.session.usuario;

      res.render("index", { masVendidos, destacados, usuario });
    } catch (error) {
      console.error('Error en la página principal:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  showLoginPage: (req, res) => {
    // Implementa la lógica para renderizar la página de inicio de sesión
    res.render('login', { pageTitle: 'Iniciar Sesión' });
  },

  showRegisterPage: (req, res) => {
    // Implementa la lógica para renderizar la página de registro de usuario
    res.render('register', { pageTitle: 'Registro de Usuario' });
  },

  // Otros métodos del controlador según tus necesidades
};

module.exports = mainController;
