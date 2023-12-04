const path = require("path");

const productController = {
   
    productForm : (req,res) =>{
        res.render('productForm.ejs');
       }
};

module.exports = {productController}