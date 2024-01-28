const express = require("express");
const path = require("path");
const session = require('express-session');
const mainRouter = require('./routes/mainRoutes.js');
const cartRouter = require('./routes/cartRoutes.js');
const productsRouter = require('./routes/productsRoutes.js');
const methodOverride = require('method-override');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const usersRoutes = require('./routes/usersRoutes'); // Agrega esta línea
const bodyParser = require('body-parser');
const app = express();

let pathPublic = path.resolve("public");
app.use(express.static(pathPublic));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(cookieParser());
// Configura body-parser
app.use(bodyParser.json());
app.use(session({
  secret: 'tu_secreto_aqui',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  if (req.session.usuario) {
    res.locals.usuario = req.session.usuario;
  }
  next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/', mainRouter);
app.use('/cart', cartRouter);
app.use('/products', productsRouter);

app.get("/", (req, res) => {
  let productFormHtml = path.resolve(__dirname, "./views/productForm.html");
  res.sendFile(productFormHtml);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
