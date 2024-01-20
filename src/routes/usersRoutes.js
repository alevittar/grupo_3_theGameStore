//usersRoutes

// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersControllers');


/*** get users - all ***/ 
//router.get('/', productsController.index); 

/*** create users***/ 
router.get('/create', usersController.create); 
//router.post('/', usersController.store); 

/*** get user ***/ 
//router.get('/detail/:id', productsController.detail); 


module.exports = router;