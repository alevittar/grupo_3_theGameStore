const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartControllers');
const {isAuthenticated , isAdmin ,restrictToAdmin } = require('../middleware/authMiddleware'); 

router.get('/', isAuthenticated  , cartController.showCartPage);
router.post('/add',isAuthenticated, cartController.addToCart);
router.post('/remove/:productId',isAuthenticated , cartController.removeFromCart);

module.exports = router;
