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

const profilesDir = path.resolve(__dirname, '../public/img'); // 
const storage = multer.diskStorage({
  destination: profilesDir,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(upload.single('image'));

// Rutas
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/', mainRouter);
app.use('/cart', cartRouter);
app.use('/products', productsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});