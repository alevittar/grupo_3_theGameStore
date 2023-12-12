const path = require("path");

const controller = {
  home: (req, res) => {
    res.render("index", { message: "viemvenidos a theGameStore" });
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

};

module.exports =  controller ;
