
//usersControllers

const { Console } = require("console");
const fs = require("fs");
const path = require("path");
const multer = require('multer');
const bcrypt = require("bcryptjs");


const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));


//configuracion multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/profiles'); // Directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // Nombre del archivo
  },
});

const upload = multer({ storage: storage });



const controller = {
  
  // Create - Form to create
  create: (req, res) => {
    res.render("userForm");
  },

 store: (req, res) => {
  try {
    upload.single('image')(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error en la subida del archivo');
      }

      const newUser = {
        id: users[users.length - 1].id + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
        category: req.body.category,
        image: req.file ? req.file.filename : null,
      };

      users.push(newUser);

      fs.writeFileSync(usersFilePath, JSON.stringify(users));
      res.redirect("/");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
},
recuerdame: (req, res) => { 
  if(req.body.recuerdame != undefined){
    res.cookie("recuerdame", usuarioAutenticado.email,{maxAge: 600000 })
  }
}
}



module.exports = controller;


