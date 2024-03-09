const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); //requerimos check del express-validator
const productosController = require('../controllers/productsControllers');

router.get('/', productosController.index);


//validaciones

const validateRegister = [ 
    check('name').notEmpty().withMessage('Este Campo es Obligatorio')
                 .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    check('description').isLength({ min: 20 }).withMessage('La descripcion debe tener al menos 20 caracteres'),
    /*check('image')..custom((value, { req }) => {
        if (value && !value.match(/\.(jpg|jpeg|png|gif)$/)) {
            throw new Error('La imagen debe ser un archivo JPG, JPEG, PNG o GIF');
        }
        return true;
    })*/]


router.get('/create',  productosController.create);
router.post('/create', validateRegister,productosController.store);


router.get('/detail/:id', productosController.detail);

router.get('/edit/:id', productosController.edit);
router.put('/:id', productosController.update);

router.delete('/:id/delete', productosController.destroy);

module.exports = router;
