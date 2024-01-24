// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

router.get('/login', (req, res) => {
  console.log('GET /login - Usuario en la sesión:', req.session.usuario);
  authController.showLoginForm(req, res);
});

router.post('/login', (req, res) => {
  console.log('POST /login - Usuario en la sesión:', req.session.usuario);
  authController.login(req, res);
});

router.get('/logout', (req, res) => {
  console.log('GET /logout - Usuario en la sesión:', req.session.usuario);
  authController.logout(req, res);
});

module.exports = router;
