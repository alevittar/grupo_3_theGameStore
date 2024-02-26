// app.js

const express = require("express");
const path = require("path");
const session = require('express-session');
const mainRouter = require('./routes/mainRoutes.js');
const cartRouter = require('./routes/cartRoutes.js');
const productsRouter = require('./routes/productsRoutes.js');
const methodOverride = require('method-override');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const usersRoutes = require('./routes/usersRoutes');
const multer = require('multer'); // Importa multer

const app = express();

let pathPublic = path.resolve("public");
app.use(express.static(pathPublic));

// Configura body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());

// Configura express-session
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

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });

app.use(upload.single('image')); // Middleware de multer

// Rutas
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/', mainRouter);
app.use('/cart', cartRouter);
app.use('/products', productsRouter);

app.get("/", (req, res) => {
  let productFormHtml = path.resolve(__dirname, "./views/productForm.html");
  res.sendFile(productFormHtml);
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
