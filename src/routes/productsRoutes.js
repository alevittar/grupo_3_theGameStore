//productsRoutes

// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsControllers');


/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', productsController.store); 

/*** GET PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 


/*** EDIT PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/:id', productsController.update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id/delete', productsController.destroy); 

module.exports = router;

