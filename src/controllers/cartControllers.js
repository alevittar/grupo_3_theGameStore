const cartController = {
  showCartPage: (req, res) => {
    res.render("carrito", { pageTitle: "Carrito de Compras" });
  },
};

module.exports = cartController;
