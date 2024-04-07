const express = require('express');
const router = express.Router();
const productoService = require('../services/productsService');
const userService = require('../services/userService');

router.get('/productos', async (req, res) => {
  try {
    const productos = await productoService.getAll();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
router.get('/productos/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const producto = await productoService.getById(productId);
      
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      
      res.json(producto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  router.get('/productos/categoria/:id', async (req, res) => {
    try {
      const categoryId = req.params.id;
      const productos = await productoService.getProductosPorCategoria(categoryId);
      
      if (!productos || productos.length === 0) {
        return res.status(404).json({ error: 'No se encontraron productos para esta categoría' });
      }
      
      res.json(productos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  router.get('/categorias', async (req, res) => {
    try {
      const categorias = await productoService.getAllCategories();
      
      if (!categorias || categorias.length === 0) {
        return res.status(404).json({ error: 'No se encontraron categorías' });
      }
      
      res.json(categorias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });router.get('/categorias/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const categoria = await productoService.getCategoriaById(id);
      
      if (!categoria) {
        return res.status(404).json({ error: 'No se encontró la categoría' });
      }
      
      res.json(categoria);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  router.get('/usuarios', async (req, res) => {
    try {
      const usuarios = await userService.getAllUsuarios();
      res.json(usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  router.get('/usuarios/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const usuario = await userService.getUsuarioById(userId);
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  router.get('/usuarios/roles/:rolId', async (req, res) => {
    const rolId = req.params.rolId;
    try {
      const usuarios = await userService.getUsuariosByRol(rolId);
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });


module.exports = router;