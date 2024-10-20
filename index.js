const express = require('express');
const {dbConnection} = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/index'); 
require('dotenv').config();
const path = require('path')
const cookieParser = require('cookie-parser');


// firebase
  const admin = require('firebase-admin');
  const serviceAccount = require('./config/firebase')
  admin.initializeApp({
      credential: admin.credential.cert(serviceAccount) 
  })



// Crear la app de Express
const app = express();


// Conectar a la base de datos
dbConnection();

// Middleware para procesar JSON
app.use(express.json()); 
// Middleware para manejar datos de formularios (body)
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public' y 'templates'
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'templates'))); /**/ 

// sin esta linea no lee el token
app.use(cookieParser());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//rutas 
const router = require('./routes/productRoutes');
app.use('/', router);
const authRouter = require('./routes/authRoutes')
app.use('/', authRouter)

app.get('/', (req, res) => {
  res.redirect('/products');
});


// servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));

module.exports = app; 