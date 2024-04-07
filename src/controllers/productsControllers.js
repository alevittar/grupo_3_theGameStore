const { body, validationResult } = require('express-validator');
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

  create: async (req, res) => {
    try {
      const categorias = await productoService.getAllCategories();
      res.render("productForm", { categorias });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  store: [
    body('name').notEmpty().withMessage('El campo name es obligatorio.'),
    body('description').notEmpty().withMessage('El campo description es obligatorio.'),
    body('price').isNumeric().withMessage('El campo price debe ser un número.'),
    body('stock').isInt().withMessage('El campo stock debe ser un número entero.'),
    body('category_id').isInt().withMessage('El campo category_id debe ser un número entero.'),

    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const { name, price, category_id, stock, description } = req.body;

        let newProductData = {
          name,
          price,
          category_id,
          stock,
          description,
          image: req.file ? req.file.filename : null,
        };

        const createdProduct = await Producto.create(newProductData);

        console.log('Created Product:', createdProduct);

        res.redirect('/');
      } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
      }
    },
  ],

  detail: async (req, res) => {
    const { id } = req.params;

    try {
      const product = await productoService.getById(id);

      if (!product) {
        return res.redirect("/products");
      }

      res.render("detail", { product, productId: id });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  edit: async (req, res) => {
    const { id } = req.params;

    try {
      const product = await productoService.getById(id);
      const categorias = await productoService.getAllCategories();

      if (!product) {
        return res.redirect("/products");
      }

      console.log('Product Categoria:', product.Categoria);
      res.render("productFormEdit", { product, categorias }); // Pasar categorías a la vista
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

      return res.redirect('/products');
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

  adminProd: async (req, res) => {
    try {
      const productos = await productoService.getAll();
      const categorias = await productoService.getAllCategories();
      res.render("adminProd", { productos, categorias });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  productosPorCategoria: async (req, res) => {
    const categoryId = req.params.id;
    try {
      const productos = await productoService.getProductosPorCategoria(categoryId);
      const categoria = await productoService.getCategoriaById(categoryId); // Obtener la categoría seleccionada
      res.render('categorias', { productos, categoria });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },
  filter: async (req, res) => {
    const categoryId = req.query.category; // Obtener el categoryId del query string
    try {
      const productos = await productoService.getProductosPorCategoria(categoryId);
      const categoria = await productoService.getCategoriaById(categoryId); // Obtener la categoría seleccionada
      res.render('filter', { productos, categoria }); // Renderizar la vista con los productos y la categoría
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  }
};

module.exports = productosController;
