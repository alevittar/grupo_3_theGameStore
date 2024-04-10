const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productsControllers');
const { isAdmin ,restrictToAdmin } = require('../middleware/authMiddleware'); 

router.get('/', productosController.index);
router.get('/list',restrictToAdmin,isAdmin, productosController.adminProd);

router.get('/create',restrictToAdmin, productosController.create);
router.post('/create',restrictToAdmin, productosController.store);

router.get('/detail/:id', productosController.detail);


router.get('/edit/:id' ,restrictToAdmin, isAdmin, productosController.edit);
router.put('/:id' ,restrictToAdmin, isAdmin, productosController.update);
router.delete('/:id/delete',restrictToAdmin, isAdmin, productosController.destroy);
router.get('/categoria/:id', productosController.productosPorCategoria);
router.get('/filter',restrictToAdmin,isAdmin, productosController.filter);
router.get('/search', productosController.search);
module.exports = router;