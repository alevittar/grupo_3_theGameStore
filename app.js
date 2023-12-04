const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require('./Routers/mainRouter.js');

let pathPublic = path.resolve("public");
app.use(express.static(pathPublic));


// configuracion ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const PORT = 3000;
app.listen(PORT, () =>{  
    console.log("Servidor levantado")
});

app.use('/', mainRouter);

// app.get("/", (req, res)=>{
//     let productFormHtml = path.resolve(__dirname, "./views/productForm.html");
//     res.sendFile(productFormHtml);
// });
