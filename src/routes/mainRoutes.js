//  Rutas para las vistas generales 
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Controllers');

router.get('/', controllers.home);
router.get('/login', controllers.showLoginPage);
router.get('/register', controllers.showRegisterPage);

module.exports = router;
