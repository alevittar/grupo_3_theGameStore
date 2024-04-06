const productoService = require('../services/productsService');
const cartService = require('../services/cartService');

const cartController = {
  addToCart: async (req, res) => {
    try {
      const productId = req.body.productId;
      const quantity = parseInt(req.body.quantity) || 1; // Default a 1 si no se especifica cantidad
      await cartService.addToCart(req.session, productId, quantity);
      res.redirect('/cart');
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const productId = req.params.productId;
      await cartService.removeFromCart(req.session, productId);
      res.redirect('/cart');
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  showCartPage: async (req, res) => {
    try {
      const cart = await cartService.getCart(req.session);
      const total = await cartService.calculateTotal(cart);
      const products = await Promise.all(cart.map(async (item) => {
        const product = await productoService.getById(item.productId);
        return { ...product.toJSON(), quantity: item.quantity };
      }));
      res.render('cart', { pageTitle: 'Carrito de Compras', products, total });
    } catch (error) {
      console.error('Error al mostrar la página del carrito:', error);
      res.status(500).send('Error interno del servidor');
    }
  }
};

module.exports = cartController;
