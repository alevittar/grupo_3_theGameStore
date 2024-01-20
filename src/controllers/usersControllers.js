//usersControllers

const { Console } = require("console");
const fs = require("fs");
const path = require("path");
const multer = require('multer');


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
  }
};


module.exports = controller;
