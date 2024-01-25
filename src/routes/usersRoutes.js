const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');

router.get('/perfil', usersController.mostrarPerfil);
router.get('/create', usersController.create); 
router.post('/', usersController.store); 

module.exports = router;