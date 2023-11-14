const express = require("express");
const path = require("path");
const app = express();

let pathPublic = path.resolve("public");
app.use(express.static(pathPublic));

app.listen(3000, ()=>{  
    console.log("Servidor levantado")
});

app.get("/", (req, res)=>{
    let indexHtml = path.resolve(__dirname, "./views/index.html");
    res.sendFile(indexHtml);
});
