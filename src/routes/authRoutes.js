const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/login', (req, res) => {
  if (req.session.usuario) {
    return res.redirect('/users/perfil');
  }
  authController.showLoginForm(req, res);
});

router.post('/login', (req, res) => {
  authController.login(req, res);
});

router.get('/logout', (req, res) => {
  authController.logout(req, res);
});

module.exports = router;
