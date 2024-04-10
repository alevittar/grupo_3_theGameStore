const express = require('express');
const router = express.Router();
const {redirectIfAuthenticated} = require('../middleware/authMiddleware'); 
const mainController = require('../controllers/mainControllers');

router.get('/', mainController.home);
router.get('/login',redirectIfAuthenticated, mainController.showLoginPage);
router.get('/users/create',redirectIfAuthenticated, mainController.showRegisterPage);
router.get('/nosotros', mainController.show);
module.exports = router;
