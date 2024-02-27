const { Producto } = require('../database/models');

const mainService = {
  getFeaturedProducts: async () => {
    try {
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
      const bestSellingProducts = await Producto.findAll({
        where: {
          category_id: 2
        },
        limit: 5
      });
      return bestSellingProducts;
    } catch (error) {
      console.error('Error al obtener productos más vendidos:', error);
      throw error;
    }
  },
};

module.exports = mainService;
