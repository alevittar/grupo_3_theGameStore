const express = require('express');
const app = express();
const path = require ("path")
const PORT =3030;

app.use(express.static('./public'));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./views/index.html")); 
  });

app.listen(PORT , () => {
    console.log("Servidor funcionando")
})

app.get("/register", (req, res) => {
  res.sendFile(path.resolve("./views/users/register.html")); 
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve("./views/users/login.html")); 
});


app.get("/carrito", (req, res) => {
  res.sendFile(path.resolve("./views/products/carrito.html")); 
});

