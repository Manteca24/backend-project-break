const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String, required: true},
  category: {type: String, enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Sudaderas', 'Accesorios'], required: true},
  size: {type: String, required: true},
  price: {type: Number, required: true}
}); 

// selecciona la colección en la base de datos de MongoDB según el entorno
const collectionName = process.env.NODE_ENV === 'test' ? 'test' : 'products';


const Product = mongoose.model('Product', productSchema, collectionName);

module.exports = Product;
