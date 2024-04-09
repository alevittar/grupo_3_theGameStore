const express = require('express');
const router = express.Router();
const nosotrosController = require('../controllers/nosotrosControllers');

router.get('/', nosotrosController.show);

module.exports = router;
