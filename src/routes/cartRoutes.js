const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartControllers');

router.get('/', cartController.showCartPage);
router.post('/add', cartController.addToCart);
router.post('/remove/:productId', cartController.removeFromCart);

module.exports = router;
