// Rutas para CRUD de productos 

const controller = require("../controllers/mainControllers.js");
const productControllers = require('../controllers/productsControllers.js')
const express = require("express");
const router = express.Router();



router.get("/formulario", productControllers.productForm);
router.get('/', productControllers.showProductPage);


module.exports = router;