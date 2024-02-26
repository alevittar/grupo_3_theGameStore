const fs = require('fs').promises;
const path = require('path');

async function obtenerProductoPorId(id) {
  try {
    const filePath = path.join(__dirname, '../data/productsDataBase.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const productos = JSON.parse(data);

    console.log('Contenido del archivo de productos:', productos);

    console.log('ID proporcionado para buscar:', id);

    const productoEncontrado = productos.find(producto => producto.id == id);

    if (!productoEncontrado) {
      console.error('Productos disponibles:', productos.map(producto => producto.id));
      throw new Error(`Producto no encontrado para el ID: ${id}`);
    }

    return productoEncontrado;
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw error;
  }
}

async function obtenerCarrito() {
  try {
    const filePath = path.join(__dirname, '../data/carrito.json');
    const data = await fs.readFile(filePath, 'utf-8');
    
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    return [];
  }
}

async function actualizarCarrito(carrito) {
  try {
    const filePath = path.join(__dirname, '../data/carrito.json');
    await fs.writeFile(filePath, JSON.stringify(carrito, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error al actualizar el carrito:', error);
    throw error;
  }
}

function calcularTotal(carrito) {
  return carrito.reduce((total, producto) => total + producto.price * producto.cantidad, 0);
}

const cartController = {
  showCartPage: async (req, res) => {
    try {
      const carrito = await obtenerCarrito();
      const total = calcularTotal(carrito);

      res.render('cart', { pageTitle: 'Carrito de Compras', carrito, total });
    } catch (error) {
      console.error('Error al mostrar la página del carrito:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  addToCart: async (req, res) => {
    const productId = req.body.productId;

    console.log('ID del producto recibido:', productId);

    obtenerProductoPorId(productId)
      .then(product => {
        obtenerCarrito()
          .then(carrito => {
            const existingProductIndex = carrito.findIndex(item => item.id === productId);

            if (existingProductIndex !== -1) {
              carrito[existingProductIndex].cantidad++;
            } else {
              carrito.push({ ...product, cantidad: 1 });
            }

            actualizarCarrito(carrito)
              .then(() => {
                res.redirect('/cart');
              })
              .catch(error => {
                console.error('Error al actualizar el carrito:', error);
                res.status(500).send('Error interno del servidor');
              });
          })
          .catch(error => {
            console.error('Error al obtener el carrito:', error);
            res.status(500).send('Error interno del servidor');
          });
      })
      .catch(error => {
        console.error('Error al obtener el producto:', error);
        res.status(500).send('Error interno del servidor');
      });
  }
};

module.exports = cartController;
