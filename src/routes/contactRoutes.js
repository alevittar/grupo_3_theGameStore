const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactControllers');

// Ruta GET para mostrar el formulario de contacto
router.get('/create', contactController.create);

// Ruta POST para procesar el formulario de contacto
router.post('/create', contactController.create);

module.exports = router;
