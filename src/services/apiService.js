const { Producto, Categoria, Usuario } = require('../database/models');

const apiService = {
  getAll: async () => {
    try {
      const productos = await Producto.findAll({
        include: { model: Categoria, as: 'Categoria' }
      });
      return { data: productos }; // Envolver los productos dentro de un objeto con la clave "data"
    } catch (error) {
      console.error('Error al obtener productos desde la base de datos:', error);
      throw new Error('Error al obtener productos desde la base de datos');
    }
  },
  getAllUsuarios: async () => {
    try {
      const usuarios = await Usuario.findAll({
        attributes: ['id', 'first_name', 'last_name', 'email', 'image', 'rol_id']
      });
      return { data: usuarios }; // Envolver los usuarios dentro de un objeto con la clave "data"
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error);
      throw new Error('Error al obtener todos los usuarios');
    }
  },
  getLastProducto: async () => {
    try {
      const lastProducto = await Producto.findOne({
        order: [['createdAt', 'DESC']], // Ordenar por fecha de creación descendente
        include: { model: Categoria, as: 'Categoria' }
      });
      return { data: lastProducto }; // Envolver el último producto dentro de un objeto con la clave "data"
    } catch (error) {
      console.error('Error al obtener el último producto:', error);
      throw new Error('Error al obtener el último producto');
    }
  },
  getLastUsuario: async () => {
    try {
      const lastUsuario = await Usuario.findOne({
        order: [['createdAt', 'DESC']], // Ordenar por fecha de creación descendente
        attributes: ['id', 'first_name', 'last_name', 'email', 'image', 'rol_id']
      });
      return { data: lastUsuario }; // Envolver el último usuario dentro de un objeto con la clave "data"
    } catch (error) {
      console.error('Error al obtener el último usuario:', error);
      throw new Error('Error al obtener el último usuario');
    }
  }
};

module.exports = apiService;
