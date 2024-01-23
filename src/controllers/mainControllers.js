const path = require("path");
const fs = require("fs");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controller = {
  home: (req, res) => {
    const masVendidos = products.slice(0, 5);
    const destacados = products.slice(-5);

    // Obtener información del usuario si está autenticado
    const usuario = req.session.usuario;

    res.render("index", { masVendidos, destacados, usuario });
  },

  showCartPage: (req, res) => {
    res.render("carrito", { pageTitle: "Carrito de Compras" });
  },

  showLoginPage: (req, res) => {
    res.render("login", { pageTitle: "Iniciar Sesión" });
  },

  showRegisterPage: (req, res) => {
    res.render("register", { pageTitle: "Registro de Usuario" });
  },

  renderHomePage: (req, res) => {
    const usuario = req.session.usuario;
    res.render('index', { usuario });  // Asegúrate de incluir 'usuario' en los datos
  },
};

module.exports = controller;
