const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/perfil', isAuthenticated, usersController.mostrarPerfil);
router.get('/create', isAuthenticated, usersController.create); 
router.post('/create', isAuthenticated, usersController.store); 
router.get('/editar/:id', isAuthenticated, usersController.editar);
router.put('/:id', isAuthenticated, usersController.update); 
router.get('/:id', isAuthenticated, usersController.mostrarPerfil); 

module.exports = router;
