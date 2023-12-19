const express = require('express');
const router = express.Router();
const controllers = require('../controllers/cartControllers');

router.get('/', controllers.showCartPage);

module.exports = router;
