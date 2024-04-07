const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');
const { isAuthenticated , isAdmin } = require('../middleware/authMiddleware');

router.get('/perfil', isAuthenticated, usersController.mostrarPerfil);
router.post('/create', usersController.store);
router.get('/editar/:id', isAuthenticated, usersController.editar);
router.post('/editar/:id', isAuthenticated, usersController.update); 

// Rutas para administradores (protegidas)
router.get('/admin/editar/:id', isAuthenticated, isAdmin, usersController.editar);
router.post('/admin/editar/:id', isAuthenticated, isAdmin, usersController.update);

module.exports = router;