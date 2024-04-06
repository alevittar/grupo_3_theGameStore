const productoService = require('../services/productsService');

const cartService = {
    addToCart: async (session, productId, quantity) => {
      let cart = session.cart || [];
      const index = cart.findIndex(item => item.productId === productId);
      if (index !== -1) {
        cart[index].quantity += quantity;
      } else {
        cart.push({ productId, quantity });
      }
      session.cart = cart;
    },
  
    removeFromCart: async (session, productId) => {
      let cart = session.cart || [];
      cart = cart.filter(item => item.productId !== productId);
      session.cart = cart;
    },
  
    getCart: async (session) => {
      return session.cart || [];
    },
  
    calculateTotal: async (cart) => {
      let total = 0;
      for (const item of cart) {
        const product = await productoService.getById(item.productId);
        total += product.price * item.quantity;
      }
      return total;
    }
  };
  
  module.exports = cartService;
  