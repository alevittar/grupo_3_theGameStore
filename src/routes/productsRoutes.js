const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productsControllers');

router.get('/', productosController.index);


router.get('/create', productosController.create);
router.post('/create', productosController.store);


router.get('/detail/:id', productosController.detail);

router.get('/edit/:id', productosController.edit);
router.put('/:id', productosController.update);

router.delete('/:id/delete', productosController.destroy);

module.exports = router;
