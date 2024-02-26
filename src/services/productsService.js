const { Producto } = require('../database/models');

const productoService = {
  getAll: async () => {
    try {
      return await Producto.findAll();
    } catch (error) {
      console.error('Error al obtener productos desde la base de datos:', error);
      throw new Error('Error al obtener productos desde la base de datos');
    }
  },

  getById: async (productId) => {
    try {
      return await Producto.findByPk(productId);
    } catch (error) {
      console.error('Error al obtener el producto desde la base de datos:', error);
      throw new Error('Error al obtener el producto desde la base de datos');
    }
  },

  create: async (productoData) => {
    try {
      const newProducto = await Producto.create(productoData);
      return newProducto;
    } catch (error) {
      throw error;
    }
  },

  updateById: async (productId, updatedProductData) => {
    try {
      const [updatedRows] = await Producto.update(updatedProductData, {
        where: { id: productId },
      });

      return updatedRows > 0;
    } catch (error) {
      console.error('Error al actualizar el producto en la base de datos:', error);
      throw new Error('Error al actualizar el producto en la base de datos');
    }
  },

  deleteById: async (productId) => {
    try {
      return await Producto.destroy({
        where: { id: productId },
      });
    } catch (error) {
      console.error('Error al eliminar el producto de la base de datos:', error);
      throw new Error('Error al eliminar el producto de la base de datos');
    }
  },
};

module.exports = productoService;
