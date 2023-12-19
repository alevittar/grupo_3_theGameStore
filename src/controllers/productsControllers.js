//productsControllers

const { Console } = require("console");
const fs = require("fs");
const path = require("path");
const multer = require('multer');


const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
function getProductById(productId) {
  return products.find((product) => product.id === productId);
}
const updateProduct = (productId, newData) => {
  const productIndex = products.findIndex((product) => product.id == productId);
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...newData };
    saveProductsToFile();
    return true; // Actualización exitosa
  }
  return false; // Producto no encontrado
};
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//configuracion multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img'); // Directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // Nombre del archivo
  },
});
const upload = multer({ storage: storage });

const controller = {
  index: (req, res) => {
    const masVendidos = products.slice(0, 5);
    const destacados = products.slice(-5);

    res.render("products", { masVendidos, destacados });
  },

  detail: (req, res) => {
    const { id } = req.params;
    const product = getProductById(parseInt(id));

    if (!product) {
      res.redirect("/"); // O redirige a la página principal o muestra un error, según tus necesidades
    }

    res.render("detail", { product });
  },
  // Create - Form to create
  create: (req, res) => {
    res.render("productForm");
  },

  // Create -  Method to store

  store: (req, res) => {
    try {
      upload.single('image')(req, res, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error en la subida del archivo');
        }

        const newProduct = {
          id: products[products.length - 1].id + 1,
          name: req.body.name,
          price: req.body.price,
          category: req.body.category,
          stock: req.body.stock,
          description: req.body.description,
          image: req.file ? req.file.filename : null,
        };

        products.push(newProduct);

        fs.writeFileSync(productsFilePath, JSON.stringify(products));
        res.redirect("/");
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  // Update - Form to edit
  edit: (req, res) => {
    const { id } = req.params;
    const product = products.find((product) => product.id == id);
    if (!product) {
      res.redirect("/");
    }
    res.render("productFormEdit", { product });
  },

  update: (req, res) => {
    const productId = parseInt(req.params.id);

    // Buscar el índice del producto con el ID proporcionado
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );

    if (productIndex !== -1) {
      // Actualizar la información del producto
      products[productIndex].name = req.body.name;
      products[productIndex].price = req.body.price;
      products[productIndex].discount = req.body.discount;
      products[productIndex].category = req.body.category;
      products[productIndex].description = req.body.description;

      // Guardar la actualización en el archivo JSON
      fs.writeFileSync(productsFilePath, JSON.stringify(products));

      res.redirect('/products/detail/:id');
    }
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex !== -1) {
      products.splice(productIndex, 1);

      fs.writeFileSync(productsFilePath, JSON.stringify(products));

      res.redirect("/products");
    }
  },
};

module.exports = controller;
