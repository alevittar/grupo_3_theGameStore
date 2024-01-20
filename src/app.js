// app.js

const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require('./routes/mainRoutes.js');
const cartRouter = require('./routes/cartRoutes.js');
const productsRouter = require('./routes/productsRoutes.js');
const usersRouter = require('./routes/usersRoutes.js');
const methodOverride =  require('method-override');

let pathPublic = path.resolve("public");
app.use(express.static(pathPublic));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());


// configuracion ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




const PORT = 3000;
app.listen(PORT, () =>{  
    console.log("Servidor levantado")
});

app.use('/', mainRouter);
app.use('/cart', cartRouter);
app.use('/products', productsRouter);
app.use('/users',usersRouter);

app.get("/", (req, res)=>{
    let productFormHtml = path.resolve(__dirname, "./views/productForm.html");
    res.sendFile(productFormHtml);
});
