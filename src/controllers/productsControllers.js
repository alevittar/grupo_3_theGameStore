const controllers = {

  showProductPage: (req, res) => {
    res.render("product", { pageTitle: "Detalles del Producto" });
  },
  productForm: (req, res) => {
    res.render("productForm.ejs");
  }
};
module.exports = controllers;
