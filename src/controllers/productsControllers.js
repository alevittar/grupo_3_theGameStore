const productoService = require('../services/productsService');
const { Producto } = require('../database/models');

const productosController = {
  index: async (req, res) => {
    try {
      const productos = await productoService.getAll();
      res.render("products", { productos });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  create: (req, res) => {
    res.render("productForm");
  },

  store: async (req, res) => {
      try {
        const { name, price, category_id, stock, description } = req.body;
    
        if (!name) {
          return res.status(400).json({ error: 'El campo name es obligatorio.' });
        }
      let newProductData = {
        name: req.body.name,
        price: req.body.price,
        category_id: req.body.category_id,
        stock: req.body.stock,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
      };
  
      console.log('New Product Data:', newProductData);

      const createdProduct = await Producto.create(newProductData);
  
      console.log('Created Product:', createdProduct);
  
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  detail: async (req, res) => {
    const { id } = req.params;

    try {
      const product = await productoService.getById(id);

      if (!product) {
        return res.redirect("/products");
      }

      res.render("detail", { product });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  edit: async (req, res) => {
    const { id } = req.params;

    try {
      const product = await productoService.getById(id);

      if (!product) {
        return res.redirect("/products");
      }

      res.render("productFormEdit", { product });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  update: async (req, res) => {
    const productId = req.params.id;

    try {
      let existingProduct = await productoService.getById(productId);

      if (!existingProduct) {
        return res.redirect("/products");
      }

      // Manejo de la carga de archivos
      let image = existingProduct.image;
      if (req.file) {
        image = req.file.filename;
      }

      const updatedProductData = {
        name: req.body.name,
        price: req.body.price,
        category_id: req.body.category,
        stock: req.body.stock,
        description: req.body.description,
        image: image,
      };

      const updated = await productoService.updateById(productId, updatedProductData);

      if (updated) {
        return res.redirect(`/products/detail/${productId}`);
      }

      return res.redirect('/products'); // O redirige a otra página según tus necesidades
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  destroy: async (req, res) => {
    const productId = req.params.id;

    try {
      await productoService.deleteById(productId);

      res.redirect("/products");
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },
};

module.exports = productosController;
