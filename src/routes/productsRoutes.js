const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productsControllers');

// Obtener todos los productos
router.get('/', productosController.index);

// Crear un nuevo producto
router.get('/create', productosController.create);
router.post('/create', productosController.store);

// Obtener detalles de un producto
router.get('/detail/:id', productosController.detail);

// Editar un producto
router.get('/edit/:id', productosController.edit);
router.put('/:id', productosController.update);

// Eliminar un producto
router.delete('/:id/delete', productosController.destroy);

module.exports = router;
