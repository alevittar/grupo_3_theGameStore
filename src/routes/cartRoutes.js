const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Controllers');

router.get('/', controllers.showCartPage);

module.exports = router;
