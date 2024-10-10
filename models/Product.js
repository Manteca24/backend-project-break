const mongoose = require('mongoose');

// Definir el esquema del producto
const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String, required: true},
  category: {type: String, enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'], required: true},
  size: {type: String, enum: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'], required: true},
  price: {type: Number, required: true}
}); 

// dinámicamente selecciona la colección en la base de datos de MongoDB según el entorno
const collectionName = process.env.NODE_ENV === 'test' ? 'test' : 'products';


// Crear el modelo a partir del esquema
const Product = mongoose.model('Product', productSchema, collectionName);

module.exports = Product;
