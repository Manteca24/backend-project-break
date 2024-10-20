const express = require('express');
const { 
    showProducts, 
    showProductById, 
    showNewProductform, 
    createProduct, 
    showEditProductform, 
    updateProduct, 
    deleteProduct
} = require('../controllers/productController');

const checkAuth = require('../middlewares/authMiddleware');
const router = express.Router();

// (no protegidas)
router.get('/products', showProducts); 
router.get('/products/:productId', showProductById); 

// (protegidas)
router.get('/dashboard', checkAuth, showProducts); 
router.get('/dashboard/new', checkAuth, showNewProductform); 
router.post('/dashboard', checkAuth, createProduct); 
router.get('/dashboard/:productId', checkAuth, showProductById);
router.get('/dashboard/:productId/edit', checkAuth, showEditProductform); 
router.post('/dashboard/:productId', checkAuth, updateProduct); 
router.delete('/dashboard/:productId/delete', checkAuth, deleteProduct); 

module.exports = router;
