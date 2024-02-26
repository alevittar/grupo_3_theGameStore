const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartControllers');

    router.get('/', cartController.showCartPage);
    router.post('/addToCart', cartController.addToCart);

    module.exports = router;
