const Product = require('../models/Product');
const { getProductsCards, baseHTML } = require('../templates/templates');

// mostrar todos los productos
const showProducts = async (req, res) => {
    try {
        const { category } = req.query; 
        const filter = category ? { category } : {}; 

        const products = await Product.find(filter); 
        const productCards = getProductsCards(products, req.user);
        const html = baseHTML(`
            <h1>Catálogo de Productos</h1>
            <section id="product-list">${productCards}</section>`, req.user);
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al recuperar los productos');
    }
};

// mostrar un producto por ID
const showProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        const html = baseHTML(`
            <h1>Detalle del Producto</h1>
            <div class="product-detail">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Categoría: ${product.category}</p>
                <p>Talla: ${product.size}</p>
                <p>Precio: ${product.price}€</p>
                <a href="${req.user ? '/dashboard' : '/products'}">Volver al catálogo</a>
            </div>
        `, req.user);
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al recuperar el producto');
    }
};

// mostrar el formulario de nuevo producto
const showNewProduct = (req, res) => {
    const html = baseHTML(`
        <h1>Crear Nuevo Producto</h1>
        <form action="/dashboard" method="POST">
            <label for="name">Nombre:</label>
            <input type="text" name="name" required>
            <label for="description">Descripción:</label>
            <textarea name="description" required></textarea>
            <label for="category">Categoría:</label>
            <input type="text" name="category" required>
            <label for="size">Talla:</label>
            <input type="text" name="size" required>
            <label for="price">Precio:</label>
            <input type="number" name="price" step="0.01" required>
            <label for="image">URL de la Imagen:</label>
            <input type="text" name="image" required>
            <button type="submit">Crear Producto</button>
        </form>
        <a href="/dashboard">Volver al catálogo</a>
    `, req.user);
    res.send(html);
};

// crear un nuevo producto
const createProduct = async (req, res) => {
    const { name, description, category, size, price, image } = req.body;
    // Para convertir 'size' en un array
    // const sizes = Array.isArray(size) ? size : [size];

    const newProduct = new Product({
        name,
        description,
        category,
        size: sizes, // si size es array PENDIENTE 
        price,
        image,
    });

    try {
        const savedProduct = await newProduct.save();
        res.redirect('/dashboard'); 
    } catch (error) {
        console.error(error);
        res.status(400).send('Error al crear el producto: ' + error.message); 
    }
};

// mostrar el formulario de edición de un producto
const showEditProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        const html = baseHTML(`
            <h1>Editar Producto</h1>
            <form action="/dashboard/${productId}" method="POST">
                <label for="name">Nombre:</label>
                <input type="text" name="name" value="${product.name}" required>
                <label for="description">Descripción:</label>
                <textarea name="description" required>${product.description}</textarea>
                <label for="category">Categoría:</label>
                <input type="text" name="category" value="${product.category}" required>
                <label for="size">Talla:</label>
                <input type="text" name="size" value="${product.size}" required>
                <label for="price">Precio:</label>
                <input type="number" name="price" value="${product.price}" step="0.01" required>
                <label for="image">URL de la Imagen:</label>
                <input type="text" name="image" value="${product.image}" required>
                <button type="submit">Actualizar Producto</button>
            </form>
            <a href="/dashboard">Volver al catálogo</a>
        `, req.user);
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al recuperar el producto');
    }
};

// actualizar un producto
const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, description, category, size, price, image } = req.body;

    // // Para convertir 'size' en un array si es necesario
    // const sizes = Array.isArray(size) ? size : [size];


    if (!name || !description || !category || !sizes.length || !price || !image) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    // categoría
    const validCategories = ['Camisetas', 'Pantalones', 'Zapatos', 'Sudaderas', 'Accesorios'];
    if (!validCategories.includes(category)) {
        return res.status(400).send('Categoría no válida.');
    }

    // TALLAS PENDIENTE _ NO funciona_________
    const validShoeSizes = ['35', '36', '37', '38', '39', '40'];
    const validClothingSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];
    if (category === 'Zapatos' && !sizes.every(size => validShoeSizes.includes(size))) {
        return res.status(400).send('Talla no válida para zapatos.');
    } else if (category !== 'Zapatos' && !sizes.every(size => validClothingSizes.includes(size))) {
        return res.status(400).send('Talla no válida para ropa.');
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name,
            description,
            category,
            size: sizes, // **
            price,
            image
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).send('Producto no encontrado');
        }
        
        res.redirect('/dashboard'); 
    } catch (error) {
        console.error(error);
        res.status(400).send('Error al actualizar el producto: ' + error.message); // Mensaje de error más específico
    }
};

// eliminar un producto
const deleteProduct = async (req, res) => {
    const productId= req.params;
    console.log(productId)
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        console.log(deletedProduct)
        if (!deletedProduct) {
            return res.status(404).send('Producto no encontrado');
        }
        res.redirect('/dashboard'); 
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
