const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/perfil', isAuthenticated, usersController.mostrarPerfil);
router.post('/create', usersController.store);
router.get('/editar/:id', isAuthenticated, usersController.editar);
router.post('/editar/:id', isAuthenticated, usersController.update); 
router.get('/editar/:id', isAuthenticated, usersController.mostrarPerfil);

module.exports = router;
