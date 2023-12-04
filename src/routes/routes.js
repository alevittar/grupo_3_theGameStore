
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Controllers');

router.get('/', controllers.home);
router.get('/carrito', controllers.showCarritoPage);
router.get('/login', controllers.showLoginPage);
router.get('/register', controllers.showRegisterPage);
router.get('/product', controllers.showProductPage);

module.exports = router;
