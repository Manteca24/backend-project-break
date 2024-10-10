const express = require('express');
const {dbConnection} = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/index'); 
require('dotenv').config();

// Crear la app de Express
const app = express();

// Conectar a la base de datos
dbConnection();

app.use(express.json()); // Middleware para procesar JSON


// Middleware para manejar datos de formularios (body)
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes); // Registrar las rutas de productos

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando y conectado a MongoDB!');
});

// Escuchar en el puerto definido en .env o 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

module.exports = app; 