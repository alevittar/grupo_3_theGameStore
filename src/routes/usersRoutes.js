const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');

router.get('/perfil', usersController.mostrarPerfil);
router.get('/create', usersController.create); 
router.post('/create', usersController.store); 
router.get('/editar/:id', usersController.editar);
router.put('/:id', usersController.update); 
router.get('/:id', usersController.mostrarPerfil); 

module.exports = router;