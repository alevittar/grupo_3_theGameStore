const controller = require("../controllers/mainController.js");
const express = require("express");
const router = express.Router();



router.get("/formulario", controller.productController.productForm);


module.exports = router;