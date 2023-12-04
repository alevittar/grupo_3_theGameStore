
const controllers = {};

controllers.home = (req, res) => {
  res.render('index', { message: 'viemvenidos a theGameStore' });
};

controllers.showCarritoPage = (req, res) => {
  res.render('carrito', { pageTitle: 'Carrito de Compras' });
};

controllers.showLoginPage = (req, res) => {
  res.render('login', { pageTitle: 'Iniciar Sesión' });
};

controllers.showRegisterPage = (req, res) => {
  res.render('register', { pageTitle: 'Registro de Usuario' });
};

controllers.showProductPage = (req, res) => {
  res.render('product', { pageTitle: 'Detalles del Producto' });
};


module.exports = controllers;
