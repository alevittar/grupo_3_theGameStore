const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productsControllers');
const { isAdmin } = require('../middleware/authMiddleware'); 

router.get('/', productosController.index);

router.get('/create', productosController.create);
router.post('/create', productosController.store);

router.get('/detail/:id', productosController.detail);


router.get('/edit/:id', isAdmin, productosController.edit);
router.put('/:id', isAdmin, productosController.update);
router.delete('/:id/delete', isAdmin, productosController.destroy);

module.exports = router;