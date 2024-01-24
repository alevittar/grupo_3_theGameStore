// app.js

const express = require("express");
const path = require("path");
const session = require('express-session');
const mainRouter = require('./routes/mainRoutes.js');
const cartRouter = require('./routes/cartRoutes.js');
const productsRouter = require('./routes/productsRoutes.js');
const methodOverride =  require('method-override');

let pathPublic = path.resolve("public");
app.use(express.static(pathPublic));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(cookieParser());
// Configuración de express-session
app.use(session({
  secret: 'tu_secreto_aqui',
  resave: false,
  saveUninitialized: true
}));

// Middleware para verificar si el usuario está autenticado
app.use((req, res, next) => {
    if (req.session.usuario) {
      res.locals.usuario = req.session.usuario;
    }
    next();
  });

// Configuración ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas principales
app.use('/', mainRouter);
app.use('/cart', cartRouter);
app.use('/products', productsRouter);

app.get("/", (req, res)=>{
    let productFormHtml = path.resolve(__dirname, "./views/productForm.html");
    res.sendFile(productFormHtml);
});
