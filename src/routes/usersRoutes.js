const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');

router.get('/perfil', usersController.mostrarPerfil);
router.get('/create', usersController.create); 
router.post('/create', usersController.usuarioCreado); //creación de usuario
router.get('/editar/:id', usersController.editar); //ruta de edición
router.put('/:id',usersController.update); //ruta para guardar edición
router.get('/:id', usersController.Detalle); //ver detalle de usuario
router.post('/', usersController.store); 

module.exports = router;