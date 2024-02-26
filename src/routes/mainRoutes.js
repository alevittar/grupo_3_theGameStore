const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllers');

router.get('/', mainController.home);
router.get('/login', mainController.showLoginPage);
router.get('/register', mainController.showRegisterPage);

module.exports = router;
