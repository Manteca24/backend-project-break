const Product = require('../models/Product');

// Función para mostrar todos los productos
const showProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Obtener todos los productos
        res.json(products); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al recuperar los productos'); 
    }
};

// Función para mostrar un producto por ID
const showProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId); 
        if (!product) {
            return res.status(404).send('Producto no encontrado'); 
        }
        res.json(product); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al recuperar el producto');
    }
};

// Función para mostrar el formulario de nuevo producto
const showNewProduct = (req, res) => {
    res.send('Formulario para crear un nuevo producto'); // renderizar una vista
};

// Función para crear un nuevo producto
const createProduct = async (req, res) => {
    const newProduct = new Product(req.body); 
    try {
        const savedProduct = await newProduct.save(); 
        res.status(201).json(savedProduct); 
    } catch (error) {
        console.error(error);
        res.status(400).send('Error al crear el producto'); 
    }
};

// Función para mostrar el formulario de edición de un producto
const showEditProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId); 
        if (!product) {
            return res.status(404).send('Producto no encontrado'); 
        }
        res.send(`Formulario para editar producto con ID: ${productId}`); // renderizar una vista con los datos del producto
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al recuperar el producto'); 
    }
};

// Función para actualizar un producto
const updateProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true }); // Actualizar el producto
        if (!updatedProduct) {
            return res.status(404).send('Producto no encontrado'); 
        }
        res.json(updatedProduct); 
    } catch (error) {
        console.error(error);
        res.status(400).send('Error al actualizar el producto'); 
    }
};

// Función para eliminar un producto
const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId); 
        if (!deletedProduct) {
            return res.status(404).send('Producto no encontrado'); 
        }
        res.send('Producto eliminado con éxito'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el producto'); 
    }
};

// Exportar las funciones
module.exports = {
    showProducts,
    showProductById,
    showNewProduct,
    createProduct,
    showEditProduct,
    updateProduct,
    deleteProduct,
};
