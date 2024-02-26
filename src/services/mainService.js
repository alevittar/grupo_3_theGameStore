const { Producto } = require('../database/models');

const mainService = {
  getFeaturedProducts: async () => {
    try {
      // Puedes personalizar la lógica para obtener productos destacados
      const featuredProducts = await Producto.findAll({
        where: {
          category_id: 1
        },
        limit: 5
      });
      return featuredProducts;
    } catch (error) {
      console.error('Error al obtener productos destacados:', error);
      throw error;
    }
  },

  getBestSellingProducts: async () => {
    try {
      // Puedes personalizar la lógica para obtener productos más vendidos
      const bestSellingProducts = await Producto.findAll({
        where: {
          category_id: 2 // Filtra por productos con category_id igual a 2
        },
        limit: 5
      });
      return bestSellingProducts;
    } catch (error) {
      console.error('Error al obtener productos más vendidos:', error);
      throw error;
    }
  },

  // Otros métodos según tus necesidades
};

module.exports = mainService;
