const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String, required: true},
  category: {type: String, enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Sudaderas', 'Accesorios'], required: true},
  size: {type: [String], required: true, validate: {
    validator: function(size) { 
      // Tallas según categoría NO FUNCIONA______________
      if (this.category === 'Zapatos') {
        return size.every(s => ['35', '36', '37', '38', '39', '40', '41', '42', '43'].includes(s));
      } else {
        return size.every(s => ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'].includes(s));
      }
    
      // añadir mensaje `Talla no válida para la categoría ${this.category}`
  }}
},
  price: {type: Number, required: true}
}); 

// selecciona la colección en la base de datos de MongoDB según el entorno
const collectionName = process.env.NODE_ENV === 'test' ? 'test' : 'products';


const Product = mongoose.model('Product', productSchema, collectionName);

module.exports = Product;
