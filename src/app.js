
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/routes');
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, '../public')));


// Uso de  las rutas
app.use(routes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
