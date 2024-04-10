const { Producto, Categoria, Usuario } = require('../database/models');

const apiService = {
  getAll: async () => {
    try {
      const productos = await Producto.findAll({
        include: { model: Categoria, as: 'Categoria' } // Incluye la categoría asociada al producto
      });
      const productosConCategoria = productos.map(producto => ({
        id: producto.id,
        name: producto.name,
        description: producto.description,
        image: producto.image, // Cambiar a "image" en lugar de "imagen"
        stock: producto.stock,
        price: producto.price,
        categoria: producto.Categoria.nombre
      }));
      return { data: productosConCategoria };
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
        attributes: ['id', 'first_name', 'last_name', 'email', 'image', 'rol_id', 'createdAt'] // Incluir createdAt
      });
      return { data: lastUsuario }; // Envolver el último usuario dentro de un objeto con la clave "data"
    } catch (error) {
      console.error('Error al obtener el último usuario:', error);
      throw new Error('Error al obtener el último usuario');
    }
  },
  getAllCategorias: async () => {
    try {
      const categorias = await Categoria.findAll();
      return { data: categorias }; // Envolver las categorías dentro de un objeto con la clave "data"
    } catch (error) {
      console.error('Error al obtener todas las categorías:', error);
      throw new Error('Error al obtener todas las categorías');
    }
  },
  getCategoriaById: async (categoryId) => {
    try {
      const categoria = await Categoria.findByPk(categoryId);
      if (!categoria) {
        throw new Error('Categoría no encontrada');
      }
      return { data: categoria };
    } catch (error) {
      console.error('Error al obtener la categoría:', error);
      throw new Error('Error al obtener la categoría');
    }
  },
  getStats: async () => {
    try {
      const totalProductos = await Producto.count();
      const totalUsuarios = await Usuario.count();
      const totalCategorias = await Categoria.count();
  
      return { totalProductos, totalUsuarios, totalCategorias };
    } catch (error) {
      console.error('Error al obtener las estadísticas:', error);
      throw new Error('Error al obtener las estadísticas');
    }
  }
};

module.exports = apiService;
