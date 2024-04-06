const productsService = require('../services/productsService');

const categoriaMiddleware = async (req, res, next) => {
  try {
    const categorias = await productsService.getAllCategories();
    res.locals.categorias = categorias; 
    next();
  } catch (error) {
    console.error('Error al cargar las categorías:', error);
    res.locals.categorias = []; 
    next();
  }
};

module.exports = categoriaMiddleware;