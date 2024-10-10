const request = require('supertest');
const app = require('../index'); 
const mongoose = require('mongoose');
const Product = require('../models/Product'); 

// Conectar a la base de datos antes de todas las pruebas
beforeAll(async () => {
    console.log('Conectando a la base de datos de pruebas...');
    console.log('URI de pruebas:', process.env.MONGO_URI_TEST);
    
    try {
        await mongoose.connect(process.env.MONGO_URI_TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Base de datos de pruebas conectada con éxito');
    } catch (error) {
        console.error('Error de conexión a la base de datos de pruebas:', error);
        throw error; 
    }
});


// Desconectar de la base de datos después de todas las pruebas
afterAll(async () => {
    await Product.deleteMany();
    await mongoose.connection.close();
});

describe('Product management', () => {
    let productId;

    it('should create a product', async () => {
        const response = await request(app)
            .post('/products/dashboard') 
            .send({
                name: 'Camiseta',
                description: 'Camiseta de algodón',
                price: 20,
                size: 'M', 
                category: 'Camisetas',
                image: 'link-to-image',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe('Camiseta');
        productId = response.body._id;
    });

    it('should retrieve all products', async () => {
        const response = await request(app).get('/products/dashboard'); 
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should retrieve a product by ID', async () => {
        const response = await request(app).get(`/products/dashboard/${productId}`); 
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', productId.toString()); ////!!!!!!!!!!!!! toSTRING
    });

    it('should return 404 if product not found', async () => {
        const response = await request(app).get('/products/products/60b9c5e3f1c7c66c3a2c75f0'); // Un ID que no existe
        expect(response.status).toBe(404);
        expect(response.text).toBe('Producto no encontrado');
    });

    it('should update a product', async () => {
        const response = await request(app)
            .put(`/products/dashboard/${productId}`)
            .send({
                name: 'Camiseta Actualizada',
                description: 'Camiseta de algodón azul',
                price: 25,
                size: 'L',
                category: 'Camisetas',
                image: 'link-to-image-updated',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', productId);
        expect(response.body.name).toBe('Camiseta Actualizada');
    });

    it('should return 404 if product to update not found', async () => {
        const response = await request(app)
            .put('/products/dashboard/60b9c5e3f1c7c66c3a2c75f0') // ID que no existe
            .send({ name: 'Producto Inexistente' });
        expect(response.status).toBe(404);
        expect(response.text).toBe('Producto no encontrado');
    });

    it('should delete a product', async () => {
        const response = await request(app).delete(`/products/dashboard/${productId}/delete`); 
        expect(response.status).toBe(200);
        expect(response.text).toBe('Producto eliminado con éxito');
    });

    it('should return 404 if product to delete not found', async () => {
        const response = await request(app).delete('/products/dashboard/60b9c5e3f1c7c66c3a2c75f0/delete'); // ID que no existe
        expect(response.status).toBe(404);
        expect(response.text).toBe('Producto no encontrado');
    });
});
