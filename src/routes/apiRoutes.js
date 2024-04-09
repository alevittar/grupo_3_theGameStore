const express = require('express');
const router = express.Router();
const apiService = require('../services/apiService');

router.get('/productos', async (req, res) => {
  try {
    const productos = await apiService.getAll();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/categorias', async (req, res) => {
  try {
    const categorias = await apiService.getAllCategories();
    
    if (!categorias || categorias.length === 0) {
      return res.status(404).json({ error: 'No se encontraron categorías' });
    }
    
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await apiService.getAllUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/ultimo-producto', async (req, res) => {
  try {
    const ultimoProducto = await apiService.getLastProducto();
    res.json(ultimoProducto);
  } catch (error) {
    console.error('Error al obtener el último producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/ultimo-usuario', async (req, res) => {
  try {
    const ultimoUsuario = await apiService.getLastUsuario();
    res.json(ultimoUsuario);
  } catch (error) {
    console.error('Error al obtener el último usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
