// routes/productRoutes.js
const express = require('express');
const { 
    showProducts, 
    showProductById, 
    showNewProduct, 
    createProduct, 
    showEditProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');

const router = express.Router();

// Rutas para los productos
router.get('/products', showProducts); // Mostrar todos los productos
router.get('/products/:productId', showProductById); // Mostrar detalle de un producto

// Rutas del dashboard
router.get('/dashboard', showProducts); // Mostrar todos los productos en el dashboard
router.get('/dashboard/new', showNewProduct); // Formulario para crear un nuevo producto
router.post('/dashboard', createProduct); // Crear un nuevo producto
router.get('/dashboard/:productId', showProductById); // Mostrar detalle de un producto en el dashboard
router.get('/dashboard/:productId/edit', showEditProduct); // Formulario para editar un producto
router.put('/dashboard/:productId', updateProduct); // Actualizar un producto
router.delete('/dashboard/:productId/delete', deleteProduct); // Eliminar un producto

module.exports = router;